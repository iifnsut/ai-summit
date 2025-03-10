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
import SpeakerCard from "@/components/includes/SpeakerCard";

const speakersList = [
  {
    name: "Mrs. Ankita Anand",
    img: "https://iasdetails.com/wp-content/uploads/2024/11/ANKITA-ANAND.webp",
    linkedin: "mailto:dcnw@nic.in",
  },
  {
    name: "Dr. Rajbir Singh",
    img: "https://media.licdn.com/dms/image/v2/C4D03AQFNoS-zyfAEKg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516249646426?e=1744848000&v=beta&t=uHiv04CynINV6E28PBamgCstb_op0zxVoujH2A3ARxI",
    linkedin: "https://www.linkedin.com/in/rajbirsingh",
  },
  {
    name: "Rohet Sareen",
    img: "https://media.licdn.com/dms/image/v2/C4D03AQEPJBnmqFHVSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1662578287791?e=1744848000&v=beta&t=obSBFFli-3p0wKZApHayqi3zrV6mNREF-Djqbb3N5ew",
    linkedin: "https://www.linkedin.com/in/rohetsareen",
  },
  {
    name: "Mr. Mayank Jain",
    img: "https://media.licdn.com/dms/image/v2/D5603AQEo_MgHMLkupg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731858003040?e=1744848000&v=beta&t=MZhn2xgJx4WMzxF0MYAu128RknrF4BX9AGMGPVBL_5c",
    linkedin: "https://www.linkedin.com/in/mysticmayank",
  },
  {
    name: "Meemansa Agarwal",
    img: "https://media.licdn.com/dms/image/v2/D5603AQGwzfYVtzESow/profile-displayphoto-shrink_400_400/B56ZPJXvRDHIAk-/0/1734250264959?e=1744848000&v=beta&t=A5_VinCWzEgerBdtcG3L6hE5X877PiwnRcR6JzKVwMI",
    linkedin: "https://www.linkedin.com/in/meemansa-agarwal-a22323242",
  },
  {
    name: "Arush Bartaria",
    img: "/images/speakers/arush-bartaria.jpg",
    linkedin: "https://www.linkedin.com/in/arush-bartaria/",
  },
  {
    name: "Dr. Dipty Tripathi",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQF1Cs1gCJQ_xA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712553225114?e=1744848000&v=beta&t=2YltUDYx2pgmPiIcC-vjgt77gc70I_MRgo3B8q06RoI",
    linkedin: "https://www.linkedin.com/in/dr-dipty-tripathi-22b13670/",
  },
  {
    name: "Maya Sherman",
    img: "https://media.licdn.com/dms/image/v2/D5603AQE8swB3MydWEA/profile-displayphoto-shrink_400_400/B56ZR0MC3VH0Ak-/0/1737116103964?e=1744848000&v=beta&t=4wqYFtBkxvqwzTtOP1iyQgOMbdo9OpvrtEMdk3dGSCk",
    linkedin: "https://www.linkedin.com/in/maya-sherman-02b474115",
  },
  {
    name: "Kamesh Shekar",
    img: "https://media.licdn.com/dms/image/v2/D5603AQF4Hykq590-Sg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1666723222608?e=1744848000&v=beta&t=rcbPuY5SShu2SpolRTGatoxJ5yst03eYOJ5kzer4Bx0",
    linkedin: "https://www.linkedin.com/in/kamesh-shekar-5456819b",
  },
  {
    name: "Himanshu Joshi",
    img: "https://media.licdn.com/dms/image/v2/C5103AQHW2TsbE-a4iw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1586338144824?e=1744848000&v=beta&t=VdoJNWGL727v6nVU8zg-Xo34skVXTjjqEbBqp0M_gQ4",
    linkedin: "https://www.linkedin.com/in/himanshujoshi1983",
  },
  {
    name: "Dr. Ankur Gupta",
    img: "https://media.licdn.com/dms/image/v2/C4D03AQGtczScb_6ZCg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516862967008?e=1744848000&v=beta&t=rOq6WToafHeEPxhbbzlwmdGi-oLoR9EjYPfZ2YYuGHw",
    linkedin: "https://www.linkedin.com/in/ankursynon",
  },
  {
    name: "Dr. Alok Nikhil Jha",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQH98CY9NbsMwA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674362925393?e=1744848000&v=beta&t=q-5JMLjui0xCnUlD9lGRBn3fWmAJ9Uz2UAlx7zVL-G8",
    linkedin: "hhttps://www.linkedin.com/in/aloknikhil",
  },
];

const mentionList = [
  {
    name: "Prof. Anand Srivastava",
    img: "https://media.licdn.com/dms/image/v2/C4E03AQFabAfqHWAQkQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1658841704663?e=1744848000&v=beta&t=SE78utfLsmr2qLiD3GbIH3sBft5QDLgb3dw2jWdtIA4",
    linkedin: "https://www.linkedin.com/in/anand-srivastava-a930a262/",
  },
  {
    name: "Prof. Prerna Gaur",
    img: "https://media.licdn.com/dms/image/v2/C5103AQFL9xqHecI5HA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1521311125753?e=1744848000&v=beta&t=gzAJMrlOeDdutdCFNyDb2P8UcUCMETpbrU3_e7y33Rc",
    linkedin: "https://www.linkedin.com/in/prof-prerna-gaur-1819621/",
  },
  {
    name: "Himanshu Singhal",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQFoKMUEOE8V9A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1703089907067?e=1744848000&v=beta&t=PrZ9HTT-FslFILRcYaD2u1Pfj5FkUnQUMVxR2tpsLGk",
    linkedin: "https://www.linkedin.com/in/himanshusinghal4/",
  },
  {
    name: "Maya Sherman",
    img: "https://media.licdn.com/dms/image/v2/D5603AQE8swB3MydWEA/profile-displayphoto-shrink_400_400/B56ZR0MC3VH0Ak-/0/1737116103964?e=1744848000&v=beta&t=4wqYFtBkxvqwzTtOP1iyQgOMbdo9OpvrtEMdk3dGSCk",
    linkedin: "https://www.linkedin.com/in/maya-sherman-02b474115/",
  },
];

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
      date: "19th FEB - 14th MARCH 2025",
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
    { title: "Speaker", href: "#speakers" },
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
    { Q: "4.What are the key highlights of the summit?", A: "Expert talks, panel discussions, networking, and an ideathon" },
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
          <Image src={"/images/logo.png"} alt="logo" width={1920} height={720} className="w-auto px-3 md:px-0 md:w-full" />
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
              <Link target="_blank" href="https://drive.google.com/file/d/1me5VXGfLu3aMwM9peT4yU85hNxKm9UaW/view?usp=drive_link">
                More Info <ChevronRight />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Box>
      <Box
        onViewportEnter={updateTabs}
        id="about"
        className="w-full min-h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-b from-background/0 via-background/100 to-background py-4">
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
        <Heading className="text-[clamp(1rem,7vw,5rem)] mt-8">Honorable Mentions</Heading>
        <div className="relative mx-6 mb-20 sm:mb-16 md:mb-12 lg:mb-10 sm:mx-8 lg:mx-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 content-center justify-center items-center">
          {mentionList.map((speaker, index) => (
            <SpeakerCard key={index} name={speaker.name} img={speaker.img} linkedin={speaker.linkedin} index={index} />
          ))}
        </div>
      </Box>
      <Box
        onViewportEnter={updateTabs}
        id="events"
        className="w-full min-h-screen flex items-center justify-center bg-background flex-col gap-2 md:gap-6 py-16">
        <Heading>EVENTS</Heading>
        <div className="px-2 md:w-2/3">
          <Carousel opts={{ loop: true }} className="aspect-video">
            <CarouselContent>
              {eventsData.map((event, index) => (
                <CarouselItem key={index}>
                  <div className="w-full flex items-center flex-col gap-4 md:gap-12">
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
      <Box
        onViewportEnter={updateTabs}
        id="speakers"
        className="w-full min-h-screen h-auto flex items-center justify-center bg-background flex-col py-16">
        <Heading>SPEAKERS</Heading>
        <div className="relative mx-6 mb-20 sm:mb-16 md:mb-12 lg:mb-10 sm:mx-8 lg:mx-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 content-center justify-center items-center">
          {speakersList.map((speaker, index) => (
            <SpeakerCard key={index} name={speaker.name} img={speaker.img} linkedin={speaker.linkedin} index={index} />
          ))}
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
