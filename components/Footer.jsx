export default function Footer({ name, socials }) {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer>
      <p className="footer-copy">© {year} {name}</p>
      <div className="footer-socials">
        {socials.filter(s => !s.isMail).map(s => (
          <a key={s.id} href={s.href} className="footer-social" target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </div>
    </footer>
  );
}
