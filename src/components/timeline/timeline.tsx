"use client";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useRef } from "react";
import { HTMLMotionProps, motion, useScroll, useTransform } from "motion/react";

export default function Timeline(allProps: { timelineData: timelineItem[] } & Omit<HTMLMotionProps<"div">, "ref">) {
  const { timelineData, ...props } = allProps;
  const variants = {
    initial: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  return (
    <motion.div
      {...props}
      className={cn("flex flex-col p-4 md:px-48", props?.className)}
      variants={variants}
      initial={"initial"}
      whileInView={"show"}
      viewport={{ once: true }}>
      {timelineData.map((item, index) => (
        <TimelineItem item={item} key={index} />
        // <div key={index} className="flex gap-2 relative">
        //   <div className="border border-primary rounded-full flex aspect-square p-2 items-center w-10 h-10 z-10">
        //     <item.icon enableBackground={1} className="bg-primary text-primary-foreground rounded-full p-1 w-6 h-6" />
        //   </div>
        //   <div className="flex flex-col gap-2">
        //     <h2 className="font-montserrat font-bold text-3xl">{item.date}</h2>
        //     <p className="text-muted-foreground">{item.desc}</p>
        //   </div>
        //   <div className="absolute bg-border h-full w-[1px] top-5 left-5 -translate-x-1/2"></div>
        // </div>
      ))}
    </motion.div>
  );
}

function TimelineItem({ item }: { item: timelineItem }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const variants = {
    initial: {
      opacity: 0,
      transformOrigin: "top",
      scaleY: 0,
    },
    show: {
      opacity: 1,
      scaleY: 1,
      transformOrigin: "top",
      transition: {
        delayChildren: 0.75,
        type: "spring",
      },
    },
  };
  const lineVariants = {
    initial: {
      height: 0,
    },
    show: {
      height: "100%",
    },
  };
  const activeLineHeight = useTransform(scrollYProgress, [0, 1], ["0", "100%"]);
  return (
    <motion.div ref={ref} className="flex gap-4 relative py-6" variants={variants}>
      <div className="flex aspect-square p-2 items-center w-10 h-10 z-10 relative">
        <motion.div
          className="absolute w-full h-full border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-primary"
          style={{ width: activeLineHeight, height: activeLineHeight }}
        />
        <item.icon className="bg-primary text-primary-foreground rounded-full p-1 w-6 h-6 stroke-[8px] z-10" strokeWidth={8} />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h2 className="font-montserrat font-bold text-3xl">{item.date}</h2>
        <p className="text-muted-foreground">{item.desc}</p>
      </div>
      <motion.div className="absolute bg-border h-full w-[1px] top-11 left-5 -translate-x-1/2" variants={lineVariants} />
      <motion.div
        className="absolute bg-primary h-full w-[1px] top-11 left-5 -translate-x-1/2"
        variants={{ ...lineVariants, show: { ...lineVariants.show, height: activeLineHeight.get() } }}
        style={{ height: activeLineHeight }}
      />
    </motion.div>
  );
}

export type timelineItem = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  date: string;
  desc: string;
};
