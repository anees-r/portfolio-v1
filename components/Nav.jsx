'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/anees-r' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anees-r/' },
  { label: 'Behance', href: 'https://www.behance.net/anees101' },
  { label: 'Mail', href: 'mailto:anees.dev2002@gmail.com' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const linkRefs = useRef([]);
  const tl = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const spans = linkRefs.current.map(el => el?.querySelector('span'));

    tl.current = gsap.timeline({ paused: true })
      .to(overlay, { x: '0%', duration: 0.7, ease: 'power4.inOut' })
      .to(spans, { y: '0%', duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=0.3');

    return () => { tl.current?.kill(); };
  }, []);

  useEffect(() => {
    if (open) {
      tl.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleLinkClick = (href) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 700);
  };

  return (
    <>
      <nav>
        <a href="#" className="nav-logo">Anees.</a>
        <div className="nav-right">
          <ThemeToggle />
          <button className="nav-menu-btn" onClick={() => setOpen(true)}>
            <div className="hamburger">
              <span /><span />
            </div>
            Menu
          </button>
        </div>
      </nav>

      <div className="menu-overlay" ref={overlayRef}>
        <div className="menu-links">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="menu-link"
              ref={el => { if (el) linkRefs.current[i] = el; }}
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <div className="menu-right">
          <button className="menu-close" onClick={() => setOpen(false)}>✕ Close</button>
          <div className="menu-socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} className="menu-social" target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
