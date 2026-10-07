'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { renderParagraphs } from '@/lib/accent-text';

gsap.registerPlugin(ScrollTrigger);

export default function About({ text, location, email }) {
  // Location reads as the closing line, unless the about text already mentions it.
  const body = location && !text.includes(location) ? `${text}\n\n${location}` : text;

  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div>
        <p className="about-label">About</p>
      </div>
      <div>
        <p className="about-text" ref={textRef}>
          {renderParagraphs(body)}
        </p>
        <a href={email ? `mailto:${email}` : '#contact'} className="about-cta">
          Get in touch ↗
        </a>
      </div>
    </section>
  );
}
