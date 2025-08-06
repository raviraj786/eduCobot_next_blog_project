'use client';

import React from 'react';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-red-600 text-lg mt-5">
      Error loading blogs: {error.message}
    </div>
  );
}
