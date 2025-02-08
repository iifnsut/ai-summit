"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RegisterButton from "../buttons/registerButton";
import { Loading, LoginMessage } from "../Hackathon/Steps";
import { isAlreadyRegistered, registerEvent } from "./action";
import { formSchema } from "./formSchem";
import { EventFormStep, RegisterMessage } from "./Steps";

const EventResigtrationModal = () => {
  const { toast } = useToast();
  const { isSignedIn, isLoaded } = useUser();
  const [primaryStep, setPrimaryStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handelFormSubmit = useCallback(
    async (data:any) => {
      try {
        const res = await registerEvent({ data });
        if (res.success) {
          toast({
            title: "Registration Successful",
            description: "You have successfully registered for the event",
          });
          setPrimaryStep(1);
        } else {
          toast({
            title: "Oops! Something went wrong",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        if(process.env.NODE_ENV === "development") {
            console.log(error);
        }
        toast({
          title: "Oops! Something went wrong",
          description: "Internal Server Error",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    if (isSignedIn) {
      isAlreadyRegistered().then((res) => {
        if (res.success) {
          setPrimaryStep(1);
        } else {
          setPrimaryStep(0);
        }
      });
    }
  }, [isSignedIn]);

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <RegisterButton
          variant={"secondary"}
          className="rounded-full flex-1 w-full"
        />
      </DialogTrigger>
      <DialogContent className="w-11/12 md:w-10/12 lg:w-8/12 max-w-2xl">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Event Registration</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {isLoaded ? null : <Loading />}
        {isLoaded && !isSignedIn ? <LoginMessage /> : null}
        {isSignedIn && (
          <>
            {primaryStep === 0 ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handelFormSubmit)}>
                  <ScrollArea>
                    <EventFormStep form={form} />
                  </ScrollArea>
                  <DialogFooter>
                    <Button type="submit" className={cn("w-11/12 mt-2 mx-auto")}>
                      Register
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            ) : primaryStep === 1 ? (
              <RegisterMessage />
            ) : null}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventResigtrationModal;
