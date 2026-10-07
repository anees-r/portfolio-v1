'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { renderAccent } from '@/lib/accent-text';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ headline, email }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
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
    <section className="contact" id="contact" ref={sectionRef}>
      <p className="contact-pre">Let&apos;s Work Together</p>
      <h2 className="contact-headline" ref={headlineRef}>
        {renderAccent(headline)}
      </h2>
      {email && (
        <a href={`mailto:${email}`} className="contact-email">
          {email} ↗
        </a>
      )}
    </section>
  );
}
