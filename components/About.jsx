'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
          I build <em>clean, scalable applications</em> — from robust back-end systems to polished front-end interfaces. I care about the details: performance, architecture, and code that lasts.
          <br /><br />
          Based in Pakistan, working globally.
        </p>
        <a href="mailto:anees.dev2002@gmail.com" className="about-cta">
          Get in touch ↗
        </a>
      </div>
    </section>
  );
}
