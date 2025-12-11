import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import IntroAndStats from "@/components/IntroAndStats";
import ClientCloud from "@/components/ClientCloud";
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
      <ClientCloud />
      <ServicesStatement />
      <SelectedCases />
      <ServicesSection />
      <BigCTA />
      <Footer />
    </>
  );
};

export default Index;
