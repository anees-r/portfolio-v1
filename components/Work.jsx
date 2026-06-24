'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Enterprise ERP System',
    desc: 'Full-stack ERP for a logistics company — modules for inventory, HR, payroll and reporting.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Oracle'],
    private: true,
  },
  {
    name: 'Mobile Banking App',
    desc: 'Cross-platform Flutter app with real-time transaction tracking and biometric auth.',
    tags: ['Flutter', 'Firebase', 'Node.js'],
    private: true,
  },
  {
    name: 'Circular Gallery',
    desc: 'Experiment in GSAP-driven circular motion layouts with interactive image reveals.',
    tags: ['Next.js', 'GSAP', 'CSS'],
    href: 'https://circular-animated-gallery.vercel.app/',
    private: false,
  },
  {
    name: 'Slide Menu',
    desc: 'Minimal full-screen slide-in navigation with staggered GSAP link animations.',
    tags: ['Next.js', 'GSAP', 'Motion'],
    href: 'https://slide-animated-menu.vercel.app/',
    private: false,
  },
  {
    name: 'CodeIgniter CMS',
    desc: 'Custom content management system built in CodeIgniter 4 with role-based access.',
    tags: ['CodeIgniter', 'PHP', 'MySQL'],
    private: true,
  },
];

export default function Work() {
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
        <span className="section-count">0{projects.length} Projects</span>
      </div>

      <div className="project-list">
        {projects.map((p, i) => {
          const Tag = p.private ? 'div' : 'a';
          const linkProps = p.private
            ? {}
            : { href: p.href, target: '_blank', rel: 'noreferrer' };

          return (
            <Tag
              key={p.name}
              {...linkProps}
              className="project-item"
              ref={el => { if (el) itemRefs.current[i] = el; }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="project-item-bg" />
              <span className="project-num">0{i + 1}</span>
              <div className="project-info">
                <span className="project-name">{p.name}</span>
                <span className="project-desc">{p.desc}</span>
              </div>
              <div className="project-tags">
                {p.private && (
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
