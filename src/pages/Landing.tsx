import { FAQSection } from "@/components/landing/faq-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { FooterSection } from "@/components/landing/footer-section";
import HeroSection from "@/components/landing/hero-section";
import LandingPageNavbar from "@/components/landing/navbar";

export const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <HeroSection />
      <FeatureSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};
