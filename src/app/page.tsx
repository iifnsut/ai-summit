"use client";
import Dots from "@/components/background/dots";
import Header, { tab } from "@/components/header/header";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Box from "@/components/Box/box";
import { useRef, useState } from "react";
import Heading from "@/components/heading/heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/footer/footer";
import colors from "tailwindcss/colors";
import RegisterButton from "@/components/buttons/registerButton";
import EventRegisterButton from "@/components/buttons/eventRegisterButton";
import { ChevronRight, Dot } from "lucide-react";
import Timeline from "@/components/timeline/timeline";

export default function Home() {
  const homeRef = useRef(null);
  const homeScroll = useScroll({
    target: homeRef,
    offset: ["end start", "start start"],
  });
  const aboutGradient = [
    `conic-gradient(from 0deg, ${colors.blue[500]}, ${colors.violet[800]}, ${colors.fuchsia[500]}, ${colors.blue[500]})`,
    `conic-gradient(from 360deg, ${colors.blue[500]}, ${colors.violet[800]}, ${colors.fuchsia[500]}, ${colors.blue[500]})`,
  ];
  const headerBackground = useTransform(
    homeScroll.scrollYProgress,
    [0, 1],
    ["hsla(var(--background) / 0.7)", "hsla(var(--background) / 0)"]
  );
  const timelineData = [
    { icon: Dot, date: "19th FEB 2023", desc: "Summit inauguration and Innovate4Humanity hackathon launch at NSUT" },
    {
      icon: Dot,
      date: "19th FEB - 6th MARCH 2025",
      desc: "Preliminary round of Innovate4Humanity: Participants must submit team details along with their ideation or prototype.",
    },
    { icon: Dot, date: "3rd WEEK OF MARCH 2025", desc: "Preliminary Round result of Innovate4Humanity" },
    {
      icon: Dot,
      date: "3rd WEEK OF MARCH 2025",
      desc: "Final Round of Innovate4Humanity, Speaker Sessions, events & closing of this Summit",
    },
  ];
  const headerBorder = useTransform(homeScroll.scrollYProgress, [0, 1], ["hsla(var(--border) / 1)", "hsla(var(--border) / 0)"]);
  const headerBgBlur = useTransform(homeScroll.scrollYProgress, [0, 1], ["blur(var(4px))", "blur(0px)"]);
  const [tabs, setTabs] = useState<tab[]>([
    { title: "Home", href: "#home", active: true },
    { title: "About Us", href: "#about" },
    { title: "Events", href: "#events" },
    { title: "Timeline", href: "#timeline" },
    { title: "FAQs", href: "#FAQs" },
  ]);
  const FAQs = [
    { Q: "Lorem ipsum dolor sit amet.", A: "Lorem ipsum dolor sit amet." },
    { Q: "Lorem ipsum dolor sit amet.", A: "Lorem ipsum dolor sit amet." },
    { Q: "Lorem ipsum dolor sit amet.", A: "Lorem ipsum dolor sit amet." },
    { Q: "Lorem ipsum dolor sit amet.", A: "Lorem ipsum dolor sit amet." },
    { Q: "Lorem ipsum dolor sit amet.", A: "Lorem ipsum dolor sit amet." },
  ];
  const updateTabs = (e: IntersectionObserverEntry | null) => {
    setTabs(tabs.map((tab) => ({ ...tab, active: `#${e?.target.id}` === tab.href })));
  };
  return (
    <>
      <Header
        tabs={tabs}
        className={`border-b`}
        style={{
          backdropFilter: headerBgBlur,
          backgroundColor: headerBackground,
          borderColor: headerBorder,
        }}
      />
      <Dots className="fixed top-0 -z-10" />
      <Box onViewportEnter={updateTabs} id="home" className="h-screen w-full flex justify-center items-center text-foreground">
        <motion.div
          ref={homeRef}
          initial={{ opacity: 0 }}
          style={{ opacity: homeScroll.scrollYProgress }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          viewport={{ amount: "all", margin: "0px" }}
          className="animate-growIn delay-1000 fill-mode-both flex flex-col items-center justify-center w-full md:w-2/3">
          <Image src={"/images/logo.png"} alt="logo" width={1000} height={250} className="w-auto md:w-full" />
          <div className="flex flex-row w-full md:w-1/2 px-6 gap-4 justify-center">
            <EventRegisterButton className="rounded-full flex-1 w-full">
              Hackathon <ChevronRight />
            </EventRegisterButton>
            <RegisterButton variant={"secondary"} className="rounded-full flex-1 w-full" />
          </div>
        </motion.div>
      </Box>
      <Box
        onViewportEnter={updateTabs}
        id="about"
        className="w-full h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-background/0 via-background/100 to-background">
        <Heading>ABOUT US</Heading>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-4/5 md:w-1/2 text-base md:text-2xl text-center rounded-lg relative">
          <motion.div
            className="absolute rounded-3xl opacity-75 blur"
            animate={{ background: aboutGradient, transition: { duration: 4, repeat: Infinity, ease: "linear" } }}
            style={{ inset: "-0.25rem" }}
            whileHover={{ inset: "-0.5rem" }}
            transition={{ inset: { duration: 0.4, ease: "easeInOut" } }}
          />
          <div className="bg-background relative p-6 md:p-16 rounded-3xl pointer-events-none">
            Step into the Delhi AI4Humanity Summit 2025, where NSUT IIF and the Embassy of Israel bring together innovators, thinkers, and
            changemakers to harness AI for a better world. Over a month of hackathons, competitions, and inspiring talks, explore how AI is
            revolutionizing healthcare, agriculture, and communities, creating a future that empowers all.
          </div>
        </motion.div>
      </Box>
      <Box onViewportEnter={updateTabs} id="events" className="w-full h-screen flex items-center justify-center bg-background">
        <Heading>EVENTS</Heading>
        <div className="flex"></div>
      </Box>
      <Box onViewportEnter={updateTabs} id="timeline" className="w-full h-screen flex flex-col items-center justify-center bg-background">
        <Heading>TIMELINE</Heading>
        <Timeline timelineData={timelineData} />
      </Box>
      <Box onViewportEnter={updateTabs} id="FAQs" className="w-full gap-8 h-screen flex flex-col items-center justify-center bg-background">
        <Heading>FAQs</Heading>
        <Accordion type="single" collapsible className="w-4/5 md:w-3/5">
          {FAQs.map((FAQ, index) => (
            <AccordionItem value={`${index}`} key={index} className="px-4">
              <AccordionTrigger className="md:text-lg py-8">
                <h2>{FAQ.Q}</h2>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{FAQ.A}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <Footer />
    </>
  );
}
