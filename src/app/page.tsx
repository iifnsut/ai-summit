"use client";
import Dots from "@/components/background/dots";
import Box from "@/components/Box/box";
import RegisterButton from "@/components/buttons/registerButton";
import Footer from "@/components/footer/footer";
import Header, { tab } from "@/components/header/header";
import Heading from "@/components/heading/heading";
import HackthoneModal from "@/components/Hackathon/HackthoneModal";
import Timeline from "@/components/timeline/timeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Dot } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import colors from "tailwindcss/colors";
import EventResigtrationModal from "@/components/EventRegistration/EventModal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    {
      icon: Dot,
      date: "19th FEB 2023",
      desc: "Summit inauguration and Innovate4Humanity hackathon launch at NSUT",
    },
    {
      icon: Dot,
      date: "19th FEB - 6th MARCH 2025",
      desc: "Preliminary round of Innovate4Humanity: Participants must submit team details along with their ideation or prototype.",
    },
    {
      icon: Dot,
      date: "3rd WEEK OF MARCH 2025",
      desc: "Preliminary Round result of Innovate4Humanity",
    },
    {
      icon: Dot,
      date: "3rd WEEK OF MARCH 2025",
      desc: "Final Round of Innovate4Humanity, Speaker Sessions, events & closing of this Summit",
    },
  ];
  const eventsData = [
    {
      image: <Image src={"/images/events2.png"} alt="Hackathon" width={1280} height={720} className="rounded-xl border-border border" />,
      button: <HackthoneModal />,
    },
    {
      image: <Image src={"/images/events1.png"} alt="Inauguration" width={1280} height={720} className="rounded-xl border-border border" />,
      button: (
        <Button className="rounded-full" asChild>
          <Link target="_blank" href="https://forms.gle/qmxhph9dTqQQzfm9A">
            Register <ChevronRight />
          </Link>
        </Button>
      ),
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
    {
      Q: "1. What is the AI Summit, and what is its main objective?",
      A: "The AI Summit is a premier event focused on advancements in AI and its real-world applications.",
    },
    { Q: "2. What is the theme of the AI Summit?", A: "Exploring AI innovations and their impact across industries and healthcare." },
    {
      Q: "3. When and where is the AI Summit going to be held?",
      A: "It is going to be a month long summit to be held at NSUT from 19th February,2025",
    },
    { Q: "4.What topics will be covered in the AI Summit sessions?", A: "AI ethics, ML, deep learning, NLP, AI in healthcare, and more." },
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
          <Image src={"/images/logo.png"} alt="logo" width={1920} height={720} className="w-auto md:w-full" />
          <div className="flex flex-row w-full md:w-1/2 px-6 gap-4 justify-center">
            {/* <EventRegisterButton className="rounded-full flex-1 w-full">
                Hackathon <ChevronRight />
              </EventRegisterButton> */}
            <HackthoneModal />
            {/* <RegisterButton
              variant={"secondary"}
              className="rounded-full flex-1 w-full"
            /> */}
            <Button asChild variant={"secondary"} className="rounded-full flex-1 w-full">
              <Link target="_blank" href="https://drive.google.com/file/d/1otv8_LsqEkRmwjfCM_r5ijkYLAChhgkR/view?usp=sharing">
                More Info <ChevronRight />
              </Link>
            </Button>
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
            animate={{
              background: aboutGradient,
              transition: { duration: 4, repeat: Infinity, ease: "linear" },
            }}
            style={{ inset: "-0.25rem" }}
            whileHover={{ inset: "-0.5rem" }}
            transition={{ inset: { duration: 0.4, ease: "easeInOut" } }}
          />
          <div className="bg-background relative p-6 md:p-16 rounded-3xl pointer-events-none text-justify">
            Step into the Delhi AI4Humanity Summit 2025, where NSUT IIF and the Embassy of Israel bring together innovators, thinkers, and
            changemakers to harness AI for a better world. Over a month of hackathons, competitions, and inspiring talks, explore how AI is
            revolutionizing healthcare, agriculture, and communities, creating a future that empowers all.
          </div>
        </motion.div>
      </Box>
      <Box onViewportEnter={updateTabs} id="events" className="w-full min-h-screen flex items-center justify-center bg-background flex-col">
        <Heading>EVENTS</Heading>
        <div className="px-2 md:w-2/3">
          <Carousel opts={{ loop: true }} className="aspect-video">
            <CarouselContent>
              {eventsData.map((event, index) => (
                <CarouselItem key={index}>
                  <div className="w-full flex items-center flex-col gap-4">
                    {event.image}
                    {event.button}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
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
