import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { HTMLMotionProps, motion } from "motion/react";
import RegisterButton from "../buttons/registerButton";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";

export type tab = { title: string; href: string; active?: boolean };

interface props extends Omit<HTMLMotionProps<"header">, "ref"> {
  tabs: tab[];
}
export default function Header(allProps: props) {
  const { tabs, ...props } = allProps;
  return (
    <motion.header
      {...props}
      className={cn(
        "w-full h-20 z-20 flex justify-between items-center py-4 px-6 fixed top-0 animate-slideDown",
        props?.className
      )}
    >
      <Image
        src="/images/logoHeader.png"
        alt="logo"
        width={3547}
        height={821}
        className="h-full object-contain w-min"
      />
      <NavMenu tabs={tabs} className="hidden md:flex" />
      <div className="hidden md:inline-flex">
        {/* <SignedOut>
          <SignInButton>
            <RegisterButton className="">
              Register <ChevronRight />
            </RegisterButton>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
         <RegisterButton className="">
         Register <ChevronRight />
         </RegisterButton>
      </div>
      <div className="flex justify-end items-center w-full md:hidden gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Sheet>
          <SheetTrigger asChild className="md:hidden cursor-pointer">
            <Button size={"icon"} variant={"ghost"} asChild>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"top"} className="md:hidden">
            <SheetTitle></SheetTitle>
            <div className="flex flex-col items-stretch gap-4 p-4">
              <NavMenu tabs={tabs} className="w-full max-w-full block" />
              <SignedOut>
                <SignInButton>
                  <RegisterButton className="">
                    Register <ChevronRight />
                  </RegisterButton>
                </SignInButton>
              </SignedOut>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
function NavMenu({ tabs, className }: { tabs: tab[]; className: string }) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="gap-2 border-border border py-2 px-3 rounded-lg flex-col md:flex-row bg-background/70">
        {tabs.map((tab, index) => (
          <NavigationMenuItem key={index} className="w-full flex">
            <Link href={tab.href} legacyBehavior passHref>
              <NavigationMenuLink
                active={tab?.active}
                className={cn(navigationMenuTriggerStyle(), "flex-1")}
              >
                {tab.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
