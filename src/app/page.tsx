import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import ScrollFrameSegment from "@/components/ScrollFrameSegment";
import AreasSection from "@/components/sections/AreasSection";
import LocationSection from "@/components/sections/LocationSection";
import MasterPlanSection from "@/components/sections/MasterPlanSection";
import OfficesSection from "@/components/sections/OfficesSection";
import TechnologySection from "@/components/sections/TechnologySection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <ScrollFrameSegment
          id="home"
          startFrame={1}
          endFrame={230}
          heightVh={220}
          overlay={{ variant: "hero" }}
        />
        <AreasSection />
        <Marquee
          items={[
            "MASTER-PLANNED",
            "SMART BUILDINGS",
            "INVESTOR-FIRST",
            "SUSTAINABLE",
            "TECHNOLOGY-LED",
          ]}
          className="border-y border-white/10 bg-black py-6 text-white"
        />
        <ScrollFrameSegment
          id="interiors"
          startFrame={231}
          endFrame={460}
          heightVh={170}
          overlay={{
            variant: "cinematic",
            eyebrow: "Step inside",
            title: "Interiors engineered for living.",
            badges: [
              { icon: "ruler", label: "3,200 Sq Ft", position: "left-[8%] top-[24%]" },
              { icon: "sun", label: "South Facing", position: "right-[10%] top-[40%]" },
              { icon: "building", label: "12 Residences", position: "left-[12%] bottom-[24%]" },
              { icon: "compass", label: "Cross Ventilated", position: "right-[8%] bottom-[32%]" },
            ],
          }}
        />
        <LocationSection />
        <MasterPlanSection />
        <ScrollFrameSegment
          id="amenities"
          startFrame={461}
          endFrame={695}
          heightVh={170}
          overlay={{
            variant: "cinematic",
            eyebrow: "Every detail",
            title: "Amenities that elevate everyday life.",
            badges: [
              { icon: "trees", label: "Landscaped Podium", position: "right-[8%] top-[22%]" },
              { icon: "shield", label: "24/7 Security", position: "left-[10%] top-[42%]" },
              { icon: "wifi", label: "Smart Connected", position: "right-[12%] bottom-[26%]" },
              { icon: "mapPin", label: "Prime Location", position: "left-[8%] bottom-[36%]" },
            ],
          }}
        />
        <OfficesSection />
        <TechnologySection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
