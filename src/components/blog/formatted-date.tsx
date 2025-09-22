'use client';

import { useState, useEffect } from 'react';

// A client component to render the date safely on the client
// to prevent hydration errors.
export function FormattedDate({ dateString }: { dateString: string }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    setFormattedDate(
      new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, [dateString]);

  // Render an empty fragment on the server and during the initial client render.
  // The date will appear after the client-side hydration is complete.
  return <>{formattedDate}</>;
}
