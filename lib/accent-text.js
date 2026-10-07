import { Fragment } from 'react';

// CMS text convention: words wrapped in *asterisks* render as the italic accent (<em>).
export function renderAccent(text) {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>
  );
}

// Blank line = paragraph. Rendered as <br /><br /> so the text stays one animated element.
export function renderParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
    .map((p, i) => (
      <Fragment key={i}>
        {i > 0 && <><br /><br /></>}
        {renderAccent(p)}
      </Fragment>
    ));
}
