import HeroSection from "@/components/HeroSection";
import IntroAndStats from "@/components/IntroAndStats";
import ClientCloud from "@/components/ClientCloud";
import ServicesStatement from "@/components/ServicesStatement";
import ServicesList from "@/components/ServicesList";
import SelectedCases from "@/components/SelectedCases";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <HeroSection />
      <IntroAndStats />
      <ClientCloud />
      <ServicesStatement />
      <SelectedCases />
      <ServicesList />
      <Footer />
    </>
  );
};

export default Index;
