'use client';

import dynamic from 'next/dynamic';

const AdSenseScript = dynamic(() => import('./AdSenseScript'), {
  ssr: false
});

export default function AdSenseWrapper() {
  return <AdSenseScript />;
} 