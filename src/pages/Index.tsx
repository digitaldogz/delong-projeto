import HeroSection from "@/components/HeroSection";
import IntroAndStats from "@/components/IntroAndStats";
import ClientCloud from "@/components/ClientCloud";
import ServicesStatement from "@/components/ServicesStatement";
import ServicesSection from "@/components/ServicesSection";
import SelectedCases from "@/components/SelectedCases";
import WorksSection from "@/components/WorksSection";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <HeroSection />
      <IntroAndStats />
      <ClientCloud />
      <ServicesStatement />
      <SelectedCases />
      <WorksSection />
      <ServicesSection />
      <BigCTA />
      <Footer />
    </>
  );
};

export default Index;
