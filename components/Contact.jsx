'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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
        Say <em>Hello.</em>
      </h2>
      <a href="mailto:anees.dev2002@gmail.com" className="contact-email">
        anees.dev2002@gmail.com ↗
      </a>
    </section>
  );
}
