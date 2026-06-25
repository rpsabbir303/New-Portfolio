import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
