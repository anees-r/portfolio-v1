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
          I&apos;m a developer and designer who builds <em>clean digital experiences</em> — from product interfaces to full-stack apps. I care about the details: motion, typography, and code that scales.
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
