import Contact from "@/components/sections/Contact";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import ForHospitals from "@/components/sections/ForHospitals";
import ForPatients from "@/components/sections/ForPatients";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ForHospitals />
      <ForPatients />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}