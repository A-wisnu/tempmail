'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const AdSenseScript = () => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error - AdSense global object
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, []);

  return (
    <>
      <Script
        id="adsense-init"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8085996511215136"
        crossOrigin="anonymous"
        onLoad={() => {
          console.log('AdSense script loaded successfully');
        }}
        onError={(e) => {
          console.error('AdSense script failed to load. Reason:', e.message);
        }}
      />
    </>
  );
};

export default AdSenseScript; 