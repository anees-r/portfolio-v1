'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function placeTech(items, radiusFactor) {
  return items.map((item, i) => {
    const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + radiusFactor * Math.cos(angle) * 100;
    const y = 50 + radiusFactor * Math.sin(angle) * 100;
    return { ...item, x, y };
  });
}

export default function TechStack({ items }) {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);

  const outer = placeTech(items.filter(t => t.ring === 'outer'), 0.44);
  const inner = placeTech(items.filter(t => t.ring === 'inner'), 0.29);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(orbitRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="tech-section" id="stack" ref={sectionRef}>
      <p className="tech-label">Tech Stack</p>
      <div className="circular-orbit" ref={orbitRef}>
        <div className="orbit-ring" />
        <div className="orbit-ring" />
        <div className="orbit-center">Stack</div>

        {[...outer, ...inner].map((t) => (
          <div
            key={t.id}
            className="tech-item"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            <div className="tech-item-icon">
              {t.logo && (
                <img
                  src={t.logo}
                  alt={t.name}
                  width={24}
                  height={24}
                  className={t.invertOnDark ? 'invert' : ''}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
            </div>
            <span className="tech-item-name">{t.name}</span>
            <span className="tech-proficiency">{t.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
