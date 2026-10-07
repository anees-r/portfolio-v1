'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

export default function Work({ projects, error }) {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">Selected Work</h2>
        <span className="section-count">{pad(projects.length)} Projects</span>
      </div>

      <div className="project-list">
        {projects.length === 0 && (
          <span className="project-desc" style={{ padding: '2rem 1rem' }}>
            {error ? 'Projects are unavailable right now. Please check back soon.' : 'New work coming soon.'}
          </span>
        )}
        {projects.map((p, i) => {
          const Tag = p.href ? 'a' : 'div';
          const linkProps = p.href
            ? { href: p.href, target: '_blank', rel: 'noreferrer' }
            : {};

          return (
            <Tag
              key={p.id}
              {...linkProps}
              className="project-item"
              ref={el => { if (el) itemRefs.current[i] = el; }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="project-item-bg" />
              <span className="project-num">{pad(i + 1)}</span>
              <div className="project-info">
                <span className="project-name">{p.title}</span>
                <span className="project-desc">{p.summary}</span>
              </div>
              <div className="project-tags">
                {p.isPrivate && (
                  <span className="tag" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', opacity: 0.6 }}>
                    Private
                  </span>
                )}
                {p.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
