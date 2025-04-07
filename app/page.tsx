"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './components/NavBar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import Impact from './components/Impact';
import SuccessStories from './components/SuccessStories';
import FeatureSection from './components/FeatureSection';
import FooterSection from './components/FooterSection';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'how-it-works', 'stats', 'testimonials', 'features', 'join'];

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        <section id="stats">
          <Impact />
        </section>

        <section id="testimonials">
          <SuccessStories />
        </section>

        <section id="features">
          <FeatureSection />
        </section>
      </main>

      <FooterSection />
    </div>
  );
}