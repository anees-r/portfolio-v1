'use client';
import { useEffect, useRef, useState } from 'react';
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

function TechItem({ tech, active, onActivate, onDeactivate }) {
  return (
    <div
      className={`tech-item${active ? ' is-active' : ''}`}
      style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
      data-cursor
      tabIndex={0}
      aria-label={`${tech.name}, ${tech.level}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={onActivate}
    >
      {/* Counter-rotates against the track so logos stay upright. */}
      <div className="tech-item-body">
        <div className="tech-item-icon">
          {tech.logo && (
            <img
              src={tech.logo}
              alt=""
              width={24}
              height={24}
              className={tech.invertOnDark ? 'invert' : ''}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>
        <span className="tech-item-name">{tech.name}</span>
      </div>
    </div>
  );
}

export default function TechStack({ items }) {
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);
  const spinRef = useRef([]);
  const [active, setActive] = useState(null);

  const outer = placeTech(items.filter(t => t.ring === 'outer'), 0.44);
  const inner = placeTech(items.filter(t => t.ring === 'inner'), 0.29);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        if (conditions.reduce) {
          gsap.from(orbitRef.current, {
            opacity: 0,
            duration: 0.6,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          });
          return;
        }

        gsap.from(orbitRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });

        // Continuous orbit: tracks rotate, item bodies counter-rotate.
        const spin = (track, seconds, dir) =>
          gsap.timeline({ repeat: -1, defaults: { duration: seconds, ease: 'none' } })
            .to(track, { rotation: 360 * dir }, 0)
            .to(track.querySelectorAll('.tech-item-body'), { rotation: -360 * dir }, 0);

        spinRef.current = [
          spin(orbitRef.current.querySelector('.orbit-track-outer'), 120, 1),
          spin(orbitRef.current.querySelector('.orbit-track-inner'), 90, -1),
        ];

        // Subtle 3D tilt toward the pointer.
        const tiltX = gsap.quickTo(orbitRef.current, 'rotationX', { duration: 0.8, ease: 'power3.out' });
        const tiltY = gsap.quickTo(orbitRef.current, 'rotationY', { duration: 0.8, ease: 'power3.out' });
        const onMove = (e) => {
          const r = orbitRef.current.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          tiltY(gsap.utils.clamp(-12, 12, dx * 20));
          tiltX(gsap.utils.clamp(-12, 12, -dy * 20));
        };
        const onLeave = () => { tiltX(0); tiltY(0); };

        const section = sectionRef.current;
        section.addEventListener('mousemove', onMove);
        section.addEventListener('mouseleave', onLeave);
        return () => {
          section.removeEventListener('mousemove', onMove);
          section.removeEventListener('mouseleave', onLeave);
          spinRef.current = [];
        };
      },
      sectionRef
    );

    return () => mm.revert();
  }, []);

  // Ease the orbit to a stop while something is selected.
  useEffect(() => {
    if (!spinRef.current.length) return;
    gsap.to(spinRef.current, {
      timeScale: active ? 0 : 1,
      duration: active ? 0.6 : 1.2,
      ease: 'power2.out',
      overwrite: true,
    });
  }, [active]);

  const activeTech = items.find(t => t.id === active);
  const deactivate = () => setActive(null);
  const renderItem = (t) => (
    <TechItem
      key={t.id}
      tech={t}
      active={t.id === active}
      onActivate={() => setActive(t.id)}
      onDeactivate={deactivate}
    />
  );

  return (
    <section className="tech-section" id="stack" ref={sectionRef}>
      <p className="tech-label">Tech Stack</p>
      <div className={`circular-orbit${active ? ' has-active' : ''}`} ref={orbitRef}>
        <div className="orbit-ring" />
        <div className="orbit-ring" />
        <div className="orbit-center" aria-live="polite">
          {activeTech ? (
            <span key={activeTech.id} className="orbit-center-detail">
              <span className="orbit-center-name">{activeTech.name}</span>
              <span className="orbit-center-level">{activeTech.level}</span>
            </span>
          ) : (
            'Stack'
          )}
        </div>

        <div className="orbit-track orbit-track-outer">{outer.map(renderItem)}</div>
        <div className="orbit-track orbit-track-inner">{inner.map(renderItem)}</div>
      </div>
    </section>
  );
}
