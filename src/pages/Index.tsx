import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import IntroAndStats from "@/components/IntroAndStats";
import ClientCloud from "@/components/ClientCloud";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesStatement from "@/components/ServicesStatement";
import ServicesSection from "@/components/ServicesSection";
import SelectedCases from "@/components/SelectedCases";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <IntroAndStats />
      <ServicesStatement />
      <ClientCloud />
      <SelectedCases />
      <ServicesSection />
      <MarqueeSection />
      <BigCTA />
      <Footer />
    </>
  );
};

export default Index;
