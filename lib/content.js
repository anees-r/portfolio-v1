// Data-access layer: reads the Dev site's content from Nezden (the CMS is the source of truth).
// Only SELECTs from the dev_site_* views (which apply publish/visibility rules) plus the
// social-links query from the integration brief. Results are shaped into the plain props the
// components need, so nothing else from the database reaches the browser.
import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { q } from './nezden-db';

// Content changes whenever the owner saves in the CMS; re-read at most once a minute.
const REVALIDATE_SECONDS = 60;

const cached = (fn, key) =>
  unstable_cache(fn, ['nezden', key], { revalidate: REVALIDATE_SECONDS, tags: ['nezden'] });

const mediaUrl = (path) =>
  path && process.env.NEZDEN_MEDIA_BASE
    ? `${process.env.NEZDEN_MEDIA_BASE.replace(/\/+$/, '')}/${path.split('/').map(encodeURIComponent).join('/')}`
    : null;

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

/* ── Queries ─────────────────────────────────────── */

const fetchProfile = cached(async () => {
  const [row] = await q(
    `SELECT hero_greeting, hero_subtitle, about_text, location, marquee, contact_headline,
            contact_email, name, first_name
       FROM dev_site_profile
      LIMIT 1`
  );
  return row ?? null;
}, 'profile');

const fetchProjects = cached(
  () =>
    q(
      `SELECT id, title, summary, url, repo_url, is_private, tags
         FROM dev_site_projects
        ORDER BY sort, id`
    ),
  'projects'
);

const fetchTechStack = cached(
  () =>
    q(
      `SELECT id, name, logo_key, logo_path, level, ring, invert_on_dark
         FROM dev_site_tech_stack
        ORDER BY sort, id`
    ),
  'tech-stack'
);

const fetchSocialLinks = cached(
  () =>
    q(
      `SELECT s.id, s.label, s.url
         FROM social_link s
        WHERE s.show_on_dev_site
        ORDER BY s.sort, s.id`
    ),
  'social-links'
);

// A CMS outage degrades the affected section instead of crashing the page.
// Details go to the server log only.
async function safely(label, fn, fallback) {
  if (!process.env.NEZDEN_DATABASE_URL) {
    console.error(`[content] skipped ${label}: NEZDEN_DATABASE_URL is not set (see .env.example)`);
    return { data: fallback, error: true };
  }
  try {
    return { data: await fn(), error: false };
  } catch (err) {
    console.error(`[content] failed to load ${label}:`, err.code || err.message);
    return { data: fallback, error: true };
  }
}

/* ── Shaping ─────────────────────────────────────── */

function shapeProfile(row) {
  const p = row ?? {};
  const name = (p.name ?? '').trim();
  const words = name ? name.split(/\s+/) : [];
  const firstName = (p.first_name ?? '').trim() || words[0] || '';
  // Hero shows the name on two lines: first name, then the rest in italics.
  const lastName = name.startsWith(firstName)
    ? name.slice(firstName.length).trim()
    : words.slice(1).join(' ');

  return {
    name,
    firstName,
    lastName,
    heroGreeting: p.hero_greeting || "Hello, I'm",
    heroSubtitle: p.hero_subtitle || '',
    aboutText: p.about_text || '',
    location: p.location || '',
    marquee: (p.marquee ?? []).filter(Boolean),
    contactHeadline: p.contact_headline || 'Say *Hello.*',
    contactEmail: p.contact_email || '',
  };
}

function shapeProject(p) {
  // The view already nulls links for private projects.
  return {
    id: p.id,
    title: p.title,
    summary: p.summary || '',
    href: p.is_private ? null : p.url || p.repo_url || null,
    isPrivate: Boolean(p.is_private),
    tags: p.tags ?? [],
  };
}

function shapeTech(t) {
  return {
    id: t.id,
    name: t.name,
    logo: mediaUrl(t.logo_path) ?? (t.logo_key ? `/icons/techstack/${t.logo_key}.svg` : null),
    level: capitalize(t.level),
    ring: t.ring === 'inner' ? 'inner' : 'outer',
    invertOnDark: Boolean(t.invert_on_dark),
  };
}

function shapeSocial(s) {
  return { id: s.id, label: s.label, href: s.url, isMail: s.url.startsWith('mailto:') };
}

/* ── Public API ──────────────────────────────────── */

// Deduped per request: both generateMetadata and the page need the profile.
export const getProfile = cache(async () => {
  const { data } = await safely('profile', fetchProfile, null);
  return shapeProfile(data);
});

export async function getSiteContent() {
  const [profile, projects, tech, socials] = await Promise.all([
    getProfile(),
    safely('projects', fetchProjects, []),
    safely('tech stack', fetchTechStack, []),
    safely('social links', fetchSocialLinks, []),
  ]);

  return {
    profile,
    projects: projects.data.map(shapeProject),
    projectsError: projects.error,
    tech: tech.data.map(shapeTech),
    socials: socials.data.map(shapeSocial),
  };
}
