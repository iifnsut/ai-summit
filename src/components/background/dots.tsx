"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect } from "react";

export default function Dots(props: HTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "/scripts/vanta.dots.min.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div {...props} className={cn("h-screen w-full bg-background", props?.className)}>
      <div id="dotsBackground" className="h-screen w-full animate-appear"></div>
    </div>
  );
}
