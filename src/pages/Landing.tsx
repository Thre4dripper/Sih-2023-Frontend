import { FAQSection } from "@/components/landing/faq-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { FooterSection } from "@/components/landing/footer-section";
import HeroSection from "@/components/landing/hero-section";

export const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};
