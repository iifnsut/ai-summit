import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function Heading(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        "font-black text-[clamp(3rem,10vw,10rem)] text-center text-nowrap uppercase font-montserrat bg-gradient-to-b from-foreground/75 via-foreground/60 to-foreground/25 inline-block text-transparent bg-clip-text",
        props?.className
      )}>
      {props.children}
    </h1>
  );
}
