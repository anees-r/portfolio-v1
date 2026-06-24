import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Marquee />
      <Work />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
