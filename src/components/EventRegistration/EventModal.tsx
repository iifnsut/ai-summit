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
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCallback, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import RegisterButton from "../buttons/registerButton";
import { registerEvent } from "./action";
import { formSchema } from "./formSchem";
import { EventFormStep, RegisterMessage } from "./Steps";
import { RegistrationClosed, CountDown } from "../Hackathon/Steps";
import {
  EVENT_REGISTRATION_START_DATE,
  EVENT_REGISTRATION_END_DATE,
} from "@/lib/constants";

const EventResigtrationModal = () => {
  const { toast } = useToast();
  // const { isSignedIn, isLoaded } = useUser();
  const [primaryStep, setPrimaryStep] = useState(
    EVENT_REGISTRATION_START_DATE > new Date()
      ? 0
      : EVENT_REGISTRATION_END_DATE < new Date()
      ? 3
      : 1
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handelFormSubmit = useCallback(
    async (data: any) => {
      try {
        const res = await registerEvent({ data });
        if (res.success) {
          toast({
            title: "Registration Successful",
            description: "You have successfully registered for the event",
          });
          setPrimaryStep(2);
        } else {
          toast({
            title: "Oops! Something went wrong",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
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

  const handelClose = useCallback(() => {
    if (primaryStep === 2) {
      setPrimaryStep(1);
      form.reset();
    }
  }, [primaryStep, form]);

  const { isSubmitting: pending } = useFormState({ control: form.control });

  return (
    <Dialog modal={false} onOpenChange={handelClose}>
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
        <>
          {primaryStep === 0 ? (
            <CountDown
              startDate={EVENT_REGISTRATION_START_DATE}
              onCountdownEnd={() => setPrimaryStep(1)}
            />
          ) : primaryStep === 1 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handelFormSubmit)}>
                <ScrollArea>
                  <EventFormStep form={form} />
                </ScrollArea>
                <DialogFooter>
                  <Button
                    type="submit"
                    className={cn(
                      "w-11/12 mt-2 mx-auto",
                      pending && "cursor-not-allowed"
                    )}
                    disabled={pending}
                  >
                    Register
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : primaryStep === 2 ? (
            <RegisterMessage />
          ) : primaryStep === 3 ? (
            <RegistrationClosed />
          ) : null}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default EventResigtrationModal;
