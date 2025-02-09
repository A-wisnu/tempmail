'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
}

const AdUnit = ({ slot, style, format = 'auto', responsive = true }: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        // @ts-expect-error - AdSense global object
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdUnit initialization error:', err);
    }
  }, []);

  return (
    <div ref={adRef} className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={style || { display: 'block', minHeight: '100px' }}
        data-ad-client="ca-pub-8085996511215136"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdUnit; 