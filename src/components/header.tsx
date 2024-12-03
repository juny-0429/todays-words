import React from 'react';

export default function header() {
  return (
    <header className="flex flex-col items-center gap-4">
      <h2 className="text-xs text-teal font-light">today&apos;s words</h2>
      <h1 className="text-2xl text-teal font-bold">오늘의 한마디</h1>
    </header>
  );
}
