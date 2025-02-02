import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";
export default function Box(props: Omit<HTMLMotionProps<"div">, "ref">) {
  return (
    <motion.div {...props} viewport={{ amount: 0.8 }} className={cn("w-full min-h-screen", props?.className)}>
      {props.children}
    </motion.div>
  );
}
