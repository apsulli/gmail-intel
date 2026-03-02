import { useState, useEffect } from 'react';
import { subscribeToEmails, subscribeToEvents } from '../api/db.js';

function EmailRow({ email, onSelect, selected }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsub = subscribeToEvents(email.id, setEvents);
    return unsub;
  }, [email.id]);

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
      {selected && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #dadce0' }}>
          {email.recipients?.map(r => (
            <div key={r.id} style={{ fontSize: '12px', color: '#3c4043', marginBottom: '2px' }}>
              {r.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardApp({ user }) {
  const [emails, setEmails] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToEmails(user.uid, setEmails);
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

      {emails === null && (
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
          selected={selected?.id === email.id}
          onSelect={setSelected}
        />
      ))}
    </div>
  );
}
