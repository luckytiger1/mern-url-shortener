import React from 'react';

export default function LinkCard({ link }: any) {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your Link:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Count of clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Creation date:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
}
