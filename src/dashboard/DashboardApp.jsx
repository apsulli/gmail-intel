import { useState, useEffect } from 'react';
import { subscribeToEmails, subscribeToEvents } from '../api/db.js';

function Stat({ label, value }) {
  return (
    <div>
      <span style={{ fontSize: '10px', color: '#9aa0a6', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
        {label}
      </span>
      <div style={{ fontSize: '12px', color: value ? '#202124' : '#9aa0a6' }}>
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
    stats[r.id] = { opens: 0, clicks: 0, lastOpen: null, lastClick: null };
  }
  for (const e of events) {
    const s = stats[e.recipientId];
    if (!s) continue;
    const ts = e.timestamp?.toDate?.() ?? null;
    if (e.type === 'open') {
      s.opens++;
      if (!s.lastOpen || ts > s.lastOpen) s.lastOpen = ts;
    } else if (e.type === 'click') {
      s.clicks++;
      if (!s.lastClick || ts > s.lastClick) s.lastClick = ts;
    }
  }
  return stats;
}

function EmailRow({ email, userId, onSelect, selected }) {
  const [events, setEvents] = useState([]);
  const [eventsError, setEventsError] = useState(null);

  useEffect(() => {
    setEventsError(null);
    const unsub = subscribeToEvents(userId, email.id, setEvents, setEventsError);
    return unsub;
  }, [userId, email.id]);

  const opens = events.filter(e => e.type === 'open').length;
  const clicks = events.filter(e => e.type === 'click').length;
  const sentAt = email.sentAt?.toDate?.();
  const dateStr = sentAt
    ? sentAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '—';

  return (
    <div
      onClick={() => onSelect(selected ? null : email)}
      style={{
        padding: '10px 12px',
        borderBottom: '1px solid #e0e0e0',
        cursor: 'pointer',
        background: selected ? '#e8f0fe' : 'transparent',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#202124', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email.subject || '(no subject)'}
        </span>
        <span style={{ fontSize: '11px', color: '#5f6368', marginLeft: '8px', flexShrink: 0 }}>{dateStr}</span>
      </div>
      <div style={{ marginTop: '4px', display: 'flex', gap: '12px' }}>
        <span style={{ fontSize: '11px', color: opens > 0 ? '#1a73e8' : '#9aa0a6' }}>
          👁 {opens} {opens === 1 ? 'open' : 'opens'}
        </span>
        <span style={{ fontSize: '11px', color: clicks > 0 ? '#1a73e8' : '#9aa0a6' }}>
          🔗 {clicks} {clicks === 1 ? 'click' : 'clicks'}
        </span>
        <span style={{ fontSize: '11px', color: '#9aa0a6' }}>
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
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #dadce0' }}>
            {(email.recipients ?? []).map(r => {
              const s = stats[r.id] ?? { opens: 0, clicks: 0, lastOpen: null, lastClick: null };
              return (
                <div key={r.id} style={{
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #f1f3f4',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#202124', marginBottom: '4px' }}>
                    {r.email}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                    <Stat label="Opens" value={s.opens || null} />
                    <Stat label="Clicks" value={s.clicks || null} />
                    <Stat label="Last open" value={formatTs(s.lastOpen)} />
                    <Stat label="Last click" value={formatTs(s.lastClick)} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}

export default function DashboardApp({ user }) {
  const [emails, setEmails] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setError(null);
    const unsub = subscribeToEmails(user.uid, setEmails, setError);
    return unsub;
  }, [user?.uid]);

  if (!user) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#5f6368' }}>Sign in to view tracked emails.</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#202124' }}>Gmail Intel</h2>
        <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#5f6368' }}>Tracked email activity</p>
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
      {emails !== null && emails.map(email => (
        <EmailRow
          key={email.id}
          email={email}
          userId={user.uid}
          selected={selected?.id === email.id}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}
