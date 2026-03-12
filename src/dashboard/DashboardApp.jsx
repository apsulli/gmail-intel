import { useState, useEffect } from 'react';
import { subscribeToEmails, subscribeToEvents } from '../api/db.js';
import { markSeen, getSeenMap } from '../api/seen.js';

// Returns the Sunday that starts the week containing `date`
function getWeekStart(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay()); // getDay() returns 0 for Sunday
  return d;
}

// Returns "Feb 22–Feb 28" style label for the week containing `date`
function weekLabel(date) {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const fmt = d => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${fmt(start)}–${fmt(end)}`;
}

function Stat({ label, value }) {
  return (
    <div>
      <span style={{ fontSize: '10px', color: 'var(--text-muted, #A0A0A0)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        {label}
      </span>
      <div style={{ fontSize: '12px', color: value ? 'var(--text-main, #FFFFFF)' : 'var(--text-muted, #A0A0A0)' }}>
        {value ?? '—'}
      </div>
    </div>
  );
}

function formatTs(date) {
  if (!date) return null;
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function buildRecipientStats(recipients, events) {
  const stats = {};
  for (const r of recipients) {
    stats[r.id] = { deliveredAt: null, opens: 0, lastOpen: null, clicks: 0, lastClick: null, urlClicks: {} };
  }

  // Collect open timestamps per recipient so we can split delivery from real opens
  const openTimesByRecipient = {};
  for (const e of events) {
    const s = stats[e.recipientId];
    if (!s) continue;
    const ts = e.timestamp?.toDate?.() ?? null;
    if (e.type === 'open') {
      if (!openTimesByRecipient[e.recipientId]) openTimesByRecipient[e.recipientId] = [];
      openTimesByRecipient[e.recipientId].push(ts);
    } else if (e.type === 'click') {
      s.clicks++;
      if (!s.lastClick || ts > s.lastClick) s.lastClick = ts;
      const url = e.targetUrl ?? '(unknown)';
      if (!s.urlClicks[url]) s.urlClicks[url] = { count: 0, first: ts, last: ts };
      s.urlClicks[url].count++;
      if (ts && (!s.urlClicks[url].first || ts < s.urlClicks[url].first)) s.urlClicks[url].first = ts;
      if (ts && (!s.urlClicks[url].last || ts > s.urlClicks[url].last)) s.urlClicks[url].last = ts;
    }
  }

  // First open per recipient = Google Image Proxy delivery confirmation.
  // Subsequent opens = genuine recipient re-opens.
  for (const [recipientId, times] of Object.entries(openTimesByRecipient)) {
    const s = stats[recipientId];
    if (!s) continue;
    const sorted = times.filter(Boolean).sort((a, b) => a - b);
    s.deliveredAt = sorted[0] ?? times[0] ?? null; // earliest = delivery
    s.opens = Math.max(0, times.length - 1);        // real opens exclude delivery
    s.lastOpen = sorted.length > 1 ? sorted[sorted.length - 1] : null;
  }

  return stats;
}

function EmailRow({ email, userId, onSelect, selected, isSeen, onUnreadChange }) {
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);
  const [expandedRecipient, setExpandedRecipient] = useState(null);

  useEffect(() => {
    setEventsError(null);
    const unsub = subscribeToEvents(userId, email.id, setEvents, setEventsError);
    return unsub;
  }, [userId, email.id]);

  const openEvents = events.filter(e => e.type === 'open');
  const clicks = events.filter(e => e.type === 'click').length;
  // First open per recipient = delivery confirmation (Google Image Proxy).
  // Real opens = total opens minus one-per-recipient delivery event.
  const delivered = openEvents.length > 0;
  const deliveredRecipientCount = new Set(openEvents.map(e => e.recipientId)).size;
  const realOpens = Math.max(0, openEvents.length - deliveredRecipientCount);

  useEffect(() => {
    const hasActivity = delivered || clicks > 0;
    onUnreadChange?.(email.id, hasActivity && !isSeen);
  }, [delivered, clicks, isSeen]);

  const sentAt = email.sentAt?.toDate?.();
  const dateStr = sentAt
    ? sentAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '—';

  return (
    <div
      onClick={() => onSelect(selected ? null : email)}
      style={{
        padding: '10px 12px',
        borderBottom: '1px solid var(--bg-sidebar, #121212)',
        cursor: 'pointer',
        background: selected ? 'var(--bg-card, #202020)' : 'transparent',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: (delivered || clicks > 0) && !isSeen ? 700 : 500, color: 'var(--text-main, #FFFFFF)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email.subject || '(no subject)'}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted, #A0A0A0)', marginLeft: '8px', flexShrink: 0 }}>{dateStr}</span>
      </div>
      <div style={{ marginTop: '4px', display: 'flex', gap: '12px' }}>
        <span style={{ fontSize: '11px', color: delivered ? 'var(--accent-secondary, #00FFFF)' : 'var(--text-muted, #A0A0A0)' }}>
          {delivered ? '📬 Delivered' : '📭 Not delivered'}
        </span>
        {realOpens > 0 && (
          <span style={{ fontSize: '11px', color: 'var(--accent-secondary, #00FFFF)' }}>
            👁 {realOpens} {realOpens === 1 ? 'open' : 'opens'}
          </span>
        )}
        <span style={{ fontSize: '11px', color: clicks > 0 ? 'var(--accent-secondary, #00FFFF)' : 'var(--text-muted, #A0A0A0)' }}>
          🔗 {clicks} {clicks === 1 ? 'click' : 'clicks'}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted, #A0A0A0)' }}>
          {email.recipients?.length ?? 0} recipient{email.recipients?.length !== 1 ? 's' : ''}
        </span>
      </div>
      {selected && eventsError && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #dadce0', fontSize: '11px', color: '#c5221f' }}>
          Events error: {eventsError.message}
        </div>
      )}
      {selected && !eventsError && (() => {
        const stats = buildRecipientStats(email.recipients ?? [], events);
        return (
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #333' }}>
            {(email.recipients ?? []).map(r => {
              const s = stats[r.id] ?? { opens: 0, clicks: 0, lastOpen: null, lastClick: null, urlClicks: {} };
              return (
                <div key={r.id} style={{
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #333',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-main, #FFFFFF)', marginBottom: '4px' }}>
                    {r.email}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                    <Stat label="Delivered" value={formatTs(s.deliveredAt)} />
                    <div
                      onClick={e => { e.stopPropagation(); setExpandedRecipient(expandedRecipient === r.id ? null : r.id); }}
                      style={{ cursor: s.clicks > 0 ? 'pointer' : 'default' }}
                    >
                      <span style={{ fontSize: '10px', color: 'var(--text-muted, #A0A0A0)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Clicks</span>
                      <div style={{ fontSize: '12px', color: s.clicks > 0 ? 'var(--accent-secondary, #00FFFF)' : 'var(--text-muted, #A0A0A0)' }}>
                        {s.clicks > 0 ? `${s.clicks} ▾` : '—'}
                      </div>
                    </div>
                    <Stat label="Re-opens" value={s.opens || null} />
                    <Stat label="Last click" value={formatTs(s.lastClick)} />
                  </div>
                  {expandedRecipient === r.id && s.clicks > 0 && (
                    <div style={{ marginTop: '6px', paddingLeft: '4px' }}>
                      {Object.entries(s.urlClicks).map(([url, data]) => (
                        <div key={url} style={{ marginBottom: '4px' }}>
                          <div
                            title={url}
                            style={{
                              fontSize: '11px',
                              color: 'var(--accent-secondary, #00FFFF)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '260px',
                            }}
                          >
                            {url}
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--text-muted, #A0A0A0)' }}>
                            {data.count}× · first {formatTs(data.first)} · last {formatTs(data.last)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}

export default function DashboardApp({ user, onClose }) {
  const [emails, setEmails] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [emailLimit, setEmailLimit] = useState(20);
  const [seenMap, setSeenMap] = useState({});
  const [unreadSet, setUnreadSet] = useState(new Set());

  useEffect(() => {
    if (!user) return;
    setError(null);
    const unsub = subscribeToEmails(user.uid, setEmails, setError, emailLimit);
    return unsub;
  }, [user?.uid, emailLimit]);

  useEffect(() => {
    getSeenMap().then(setSeenMap);
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'SET_BADGE', count: unreadSet.size });
    return () => {
      chrome.runtime.sendMessage({ type: 'SET_BADGE', count: 0 });
    };
  }, [unreadSet]);

  const handleSelect = (email) => {
    setSelected(email);
    if (email) {
      markSeen(email.id);
      setSeenMap(prev => ({ ...prev, [email.id]: true }));
    }
  };

  const handleUnreadChange = (emailId, isUnread) => {
    setUnreadSet(prev => {
      const next = new Set(prev);
      if (isUnread) next.add(emailId);
      else next.delete(emailId);
      return next;
    });
  };

  if (!user) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#5f6368' }}>Sign in to view tracked emails.</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', fontFamily: "var(--font-body, 'Nunito', sans-serif)", background: 'var(--bg-sidebar, #121212)', minHeight: '100vh', color: 'var(--text-main, #FFFFFF)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '2px solid var(--accent-primary, #FF1493)', background: 'var(--bg-sidebar, #121212)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--text-main, #FFFFFF)', fontFamily: "var(--font-header, 'Fredoka', sans-serif)", letterSpacing: '0.5px' }}>👀 Gmail Intel</h2>
          <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--text-muted, #A0A0A0)' }}>Tracked email activity</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {emailLimit > 20 && (
            <button
              onClick={() => setEmailLimit(20)}
              title="Reset to latest 20"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted, #5f6368)', fontSize: '16px', padding: '4px',
                lineHeight: 1, transition: 'color 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--accent-primary, #FF1493)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted, #5f6368)'}
            >
              ↺
            </button>
          )}
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', background: '#fce8e6', borderBottom: '1px solid #f5c6c2' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#c5221f', fontWeight: 500 }}>Failed to load emails</p>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#c5221f' }}>{error.message}</p>
          {error.message?.includes('index') && (
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#c5221f' }}>
              Run: <code>firebase deploy --only firestore</code>
            </p>
          )}
        </div>
      )}
      {!error && emails === null && (
        <div style={{ padding: '16px', textAlign: 'center', color: '#5f6368', fontSize: '13px' }}>Loading…</div>
      )}
      {emails !== null && emails.length === 0 && (
        <div style={{ padding: '16px', textAlign: 'center', color: '#5f6368', fontSize: '13px' }}>
          No tracked emails yet. Enable "Track Email" when composing.
        </div>
      )}
      {emails !== null && (() => {
        // Build ordered week buckets (emails are already sorted sentAt desc)
        const buckets = [];
        const seen = {};
        for (const email of emails) {
          const sentAt = email.sentAt?.toDate?.() ?? new Date();
          const label = weekLabel(sentAt);
          if (!seen[label]) {
            seen[label] = true;
            buckets.push({ label, emails: [] });
          }
          buckets[buckets.length - 1].emails.push(email);
        }
        return buckets.map(({ label, emails: group }) => (
          <div key={label}>
            <div style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--accent-primary, #FF1493)',
              background: 'var(--bg-card, #202020)',
              borderBottom: '1px solid #333',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              fontFamily: "var(--font-header, 'Fredoka', sans-serif)",
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {label}
            </div>
            {group.map(email => (
              <EmailRow
                key={email.id}
                email={email}
                userId={user.uid}
                selected={selected?.id === email.id}
                onSelect={handleSelect}
                isSeen={!!seenMap[email.id]}
                onUnreadChange={handleUnreadChange}
              />
            ))}
          </div>
        ));
      })()}
      {emails !== null && emails.length === emailLimit && (
        <div style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
          <button
            onClick={() => setEmailLimit(prev => prev + 20)}
            style={{
              fontSize: '13px', color: 'var(--bg-sidebar, #121212)', background: 'var(--accent-secondary, #00FFFF)',
              border: 'none', borderRadius: '999px',
              padding: '8px 20px', cursor: 'pointer',
              fontWeight: 600, fontFamily: "var(--font-header, 'Fredoka', sans-serif)",
              boxShadow: '0 2px 8px rgba(0, 255, 255, 0.4)'
            }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
