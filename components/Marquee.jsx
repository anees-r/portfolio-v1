export default function Marquee() {
  const items = [
    'Design', 'Development', 'Motion', 'Branding', 'React', 'Next.js', 'GSAP',
    'Design', 'Development', 'Motion', 'Branding', 'React', 'Next.js', 'GSAP',
  ];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
