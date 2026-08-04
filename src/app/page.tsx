import Hero from "@/components/hero";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import TechStack from "@/components/sections/TechStack";
import WhyUs from "@/components/sections/WhyUs";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-dtl-void">
      <Hero />
      <Services />
      <HowItWorks />
      <TechStack />
      <WhyUs />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
