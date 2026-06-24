'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const greetingRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(greetingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(line1Ref.current, { y: '0%', duration: 1, ease: 'power4.out' }, '-=0.4')
      .to(line2Ref.current, { y: '0%', duration: 1, ease: 'power4.out' }, '-=0.85')
      .to(subRef.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(scrollRef.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-greeting" ref={greetingRef} style={{ transform: 'translateY(8px)' }}>
          Hello, I&apos;m
        </div>
        <h1 className="hero-name">
          <span className="hero-name-line" ref={line1Ref}>Anees</span>
          <span className="hero-name-line italic" ref={line2Ref}>Rehman</span>
        </h1>
        <p className="hero-sub" ref={subRef}>
          Full-Stack Developer &nbsp;·&nbsp; UI/UX Designer
        </p>
      </div>

      <div className="hero-scroll-hint" ref={scrollRef}>
        <div className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  );
}
