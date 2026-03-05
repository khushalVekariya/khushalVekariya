"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import ParticleField from "@/components/ParticleField";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <main className="relative noise-overlay">
        <ScrollProgress />
        <GridBackground />
        <ParticleField />
        <Navbar />
        <Hero />
        <BentoGrid />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
