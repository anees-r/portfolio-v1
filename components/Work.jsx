'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'HMIS - Shifa Int. Hospitals',
    desc: 'Core billing and operations platform powering critical transactions.',
    tags: ['React', 'Express.js', 'Oracle'],
    private: true,
  },
  {
    name: 'Panel ChargeMaster - Shifa Int. Hospitals',
    desc: 'System for managing hospital-organizational panels and pricing.',
    tags: ['React', 'Express.js', 'Oracle'],
    private: true,
  },
  {
    name: 'Cash ChargeMaster - Shifa Int. Hospitals',
    desc: 'System for managing hospital services, packages and pricing.',
    tags: ['React', 'Express.js', 'Oracle'],
    private: true,
  },
  {
    name: 'CRM & HRMS - Nova Communications',
    desc: 'Telecom-scale customer and employee management system.',
    tags: ['CodeIgniter', 'PostgreSQL'],
    private: true,
  },
  {
    name: 'HRMS Migration - Nayatel',
    desc: 'Migrated and optimized queries from Oracle to PostgreSQL.',
    tags: ['CodeIgniter', 'Oracle', 'PostgreSQL', 'Optimization'],
    private: true,
  },
  {
    name: 'Buckit - Personal',
    desc: 'Personal finance tracker with income and expense logging.',
    tags: ['Next.js', 'PostgreSQL', 'Zod', 'Prisma'],
    href: 'https://mybuckit.vercel.app/',
    private: false,
  },
  {
    name: 'Folizen - Personal',
    desc: 'Books and reads tracker (with KoReader Plugin).',
    tags: ['Next.js', 'PostgreSQL', 'Drizzle'],
    href: 'https://folizen.vercel.app/',
    private: false,
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
