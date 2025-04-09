"use client";
import { useState, useEffect, FC } from "react";
import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Impact from "./Impact";
import SuccessStories from "./SuccessStories";
import FeatureSection from "./FeatureSection";
import FooterSection from "./FooterSection";
import { UserProfile } from "@/@types";

interface LandingPageProps {
  user: UserProfile | undefined;
}

export default function LandingPage({ user }: LandingPageProps) {
  return (
    <div>
      <main>
        <section id="home">
          <HeroSection user={user} />
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
