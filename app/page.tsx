
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Statistics from "./components/Statistics";
import Comments from "./components/Comments";
import FeatureSection from "./components/FeatureSection";
import CtaSection from "./components/CtaSection";
import FooterSection from "./components/FooterSection";
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <HeroSection />

      <HowItWorks />

      <Statistics />

      <Comments />

      <FeatureSection />

      <CtaSection />
      <FooterSection />
    </div>
  );
}
