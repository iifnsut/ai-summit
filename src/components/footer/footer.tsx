import { cn } from "@/lib/utils";
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";

export default function Footer(props: HTMLAttributes<HTMLElement>) {
  const socials = [
    { href: "", icon: Facebook },
    { href: "", icon: Twitter },
    { href: "", icon: Linkedin },
    { href: "", icon: Youtube },
    { href: "", icon: Instagram },
  ];
  return (
    <footer {...props} className={cn("border-t bg-background border-border p-4 text-sm text-muted-foreground", props?.className)}>
      <div className="flex-col md:flex-row flex justify-between gap-6 md:gap-16 rounded-lg bg-gradient-to-tr from-zinc-900 from-50% to-zinc-800 p-8">
        <div className="flex flex-col md:w-1/2 gap-2">
          <div className="flex gap-2 w-full ">
            <AspectRatio ratio={8710 / 821}>
              <Image
                src={"/images/logoHorizontal.png"}
                alt={"Embassy of Israel in India Logo"}
                width={8710}
                height={821}
                className="min-w-0 p-1 w-auto object-contain"
              />
            </AspectRatio>
          </div>
          <p>AI isn&apos;t just about technology; it&apos;s about transforming lives!</p>
          <div className="flex-1"></div>
          <div className="flex gap-2">
            {socials.map((social, index) => (
              <Link href={social.href} key={index} passHref>
                <Button size={"icon"} variant={"secondary"} className="cursor-pointer p-2" asChild>
                  <social.icon className="" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex md:w-1/2 flex-col gap-3">
          <h2 className="text-2xl md:text-3xl text-foreground">Get In Touch</h2>
          <span>
            <MapPin className="inline" />
            <address className="inline">
              {" "}
              Room 410, Library Block 4th floor, NSUT Campus, Azad Hind Fauz Marg, Dwarka-3, New Delhi-110078
            </address>
          </span>

          <span>
            <Phone className="inline" />
            <a href="tel:+918700528997"> +91 8700528997</a>
          </span>
          <span>
            <Mail className="inline" />
            <a href="mailto:support.nsutiif@nsut.ac.in"> support.nsutiif@nsut.ac.in</a>
          </span>
          <span>
            <Mail className="inline" />
            <a href="mailto:connect.nsutiif@nsut.ac.in"> connect.nsutiif@nsut.ac.in</a>
          </span>
          <span>
            <Mail className="inline" />
            <a href="mailto:nsutiif@nsut.ac.in"> nsutiif@nsut.ac.in</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
