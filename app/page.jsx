import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProfile, getSiteContent } from "@/lib/content";

// Rendered per request from cached CMS data (see lib/content.js), so edits show up within a
// minute and the build never needs database access.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { name, heroSubtitle } = await getProfile();
  if (!name) return {};
  return { title: heroSubtitle ? `${name} — ${heroSubtitle}` : name };
}

export default async function Home() {
  const { profile, projects, projectsError, tech, socials } = await getSiteContent();

  return (
    <main>
      <Nav firstName={profile.firstName} socials={socials} />
      <Hero
        greeting={profile.heroGreeting}
        firstName={profile.firstName}
        lastName={profile.lastName}
        subtitle={profile.heroSubtitle}
      />
      <About text={profile.aboutText} location={profile.location} email={profile.contactEmail} />
      <Marquee items={profile.marquee} />
      <Work projects={projects} error={projectsError} />
      <TechStack items={tech} />
      <Contact headline={profile.contactHeadline} email={profile.contactEmail} />
      <Footer name={profile.name} socials={socials} />
    </main>
  );
}
