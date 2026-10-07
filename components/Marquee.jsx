'use client';
import { useEffect, useRef } from 'react';

export default function Marquee({ items: baseItems }) {
  const trackRef = useRef(null);

  const items = [...baseItems, ...baseItems];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of exactly one set of items
    const singleWidth = track.scrollWidth / 2;

    let x = 0;
    let raf;

    const animate = () => {
      x -= 1; // speed — increase for faster
      if (Math.abs(x) >= singleWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!baseItems.length) return null;

  return (
    <div className="marquee-section">
      <div className="marquee-track" ref={trackRef} style={{ animation: 'none', willChange: 'transform' }}>
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}