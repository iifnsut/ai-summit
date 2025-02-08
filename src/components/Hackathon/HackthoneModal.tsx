"use client";
import Stepper, { StepProps } from "@/components/Stepper/Stepper";
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
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowBigLeft, ArrowBigRight, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Loading,
  LoginMessage,
  Step1,
  Step2,
  Step3,
  Step4,
  RegisterMessage,
} from "./Steps";
import { from1Schema, from2Schema, from3Schema } from "./formSchemas";
import {
  getHackathonData,
  saveHackathonData,
  markFinalSubmission,
} from "./action";
import { useToast } from "@/hooks/use-toast";

const steps: StepProps[] = [
  { title: "Step 1", description: "Team Details" },
  { title: "Step 2", description: "Member Details" },
  { title: "Step 3", description: "Prototype Details" },
  { title: "Step 4", description: "Submission" },
];

export default function HackathonModal() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completeStep, setCompleteStep] = useState(0);
  const [membersCount, setMembersCount] = useState(3);
  const [primaryCount, setPrimaryCount] = useState(1);
  const { isSignedIn, isLoaded } = useUser();

  const form1 = useForm({
    resolver: zodResolver(from1Schema),
  });
  const form2 = useForm({
    resolver: zodResolver(from2Schema),
  });
  const form3 = useForm({
    resolver: zodResolver(from3Schema),
  });

  const form = useMemo(() => {
    switch (currentStep) {
      case 0:
        return form1;
      case 1:
        return form2;
      case 2:
        return form3;
      default:
        return form1;
    }
  }, [currentStep, form1, form2, form3]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getHackathonData().then((data) => {
        const hackathonData = data?.data;
        if (hackathonData) {
          if (hackathonData.status === "submitted") {
            setPrimaryCount(2);
            return;
          }

          form1.setValue("teamName", hackathonData.teamName || "");
          form1.setValue("teamLeaderName", hackathonData.teamLeaderName || "");
          form1.setValue(
            "teamLeaderMobile",
            hackathonData.teamLeaderMobile || ""
          );
          form1.setValue(
            "teamLeaderWhatsApp",
            hackathonData.teamLeaderWhatsApp || ""
          );
          form1.setValue(
            "teamLeaderEmail",
            hackathonData.teamLeaderEmail || ""
          );
          form1.setValue("collegeName", hackathonData.collegeName || "");
          form1.setValue("membersCount", hackathonData.teamMembers.length || 3);

          form2.setValue("teamMembers", hackathonData.teamMembers || []);

          form3.setValue(
            "problemStatementId",
            hackathonData.problemStatementId || ""
          );
          form3.setValue(
            "ideaDescription",
            hackathonData.ideaDescription || ""
          );
          form3.setValue(
            "prototypeYouTubeLink",
            hackathonData.prototypeYouTubeLink || ""
          );
          form3.setValue(
            "presentationFile",
            hackathonData.presentationFile || ""
          );
          setCompleteStep(Math.min(3, hackathonData.completedSteps));
          setCurrentStep(Math.min(3, hackathonData.completedSteps + 1));
        }
      });
    }
  }, [isLoaded, isSignedIn, form1, form2, form3]);

  const handleNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompleteStep(Math.max(currentStep, completeStep));
    }
  }, [currentStep, completeStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const onSubmit = async (data: any) => {
    console.log("Submitted", data);
    if (data?.membersCount) {
      setMembersCount(data!.membersCount as number);
    }

    handleNextStep();
    try {
      const response = await saveHackathonData({ data, step: currentStep });
      console.log(response);
      if (!response.success) {
        console.error(response.error);
        setCurrentStep(Math.min(0, currentStep - 1));
        toast({
          title: "Oops!",
          description: response.message || "Something went wrong",
          variant: "destructive",
        });
      }

      toast({
        title: "Success!",
        description: response.message || "Updated successfully",
      });
    } catch (error) {
      console.error(error);
      setCurrentStep(currentStep - 1);
      toast({
        title: "Oops!",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const markSubmission = useCallback(async () => {
    if (currentStep === 3) {
      try {
        const response = await markFinalSubmission();
        console.log(response);
        if (!response.success) {
          toast({
            title: "Oops!",
            description: response.message || "Something went wrong",
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success!",
          description: response.message || "Submitted successfully",
        });
        setPrimaryCount((prev) => prev + 1);
      } catch (error) {
        console.error(error);
        toast({
          title: "Oops!",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    } else {
      console.error("Invalid step to submit");
      toast({
        title: "Oops!",
        description: "Invalid step to submit",
        variant: "destructive",
      });
    }
  }, [currentStep, toast]);

  const generateForm = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <Step1 form={form1} />;
      case 1:
        return <Step2 form={form2} membersCount={membersCount} />;
      case 2:
        return <Step3 form={form3} />;
      case 3:
        return <Step4 markSubmission={markSubmission} />;
    }
  }, [currentStep, form1, form2, form3, membersCount, markSubmission]);

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button className="rounded-full flex-1">
          Hackathon <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-4xl">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Hackathon Registration</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {primaryCount === 1 ? (
          <>
            {isLoaded ? null : <Loading />}

            {isLoaded && !isSignedIn && <LoginMessage />}

            {isLoaded && isSignedIn && (
              <>
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  setStep={(step) => {
                    if (form.formState.isValid) {
                      setCurrentStep(step);
                    }
                  }}
                  completeStep={completeStep}
                />

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <ScrollArea className="mb-1 flex-1 max-h-[60vh]">
                      {generateForm}
                    </ScrollArea>
                    <DialogFooter className="w-full">
                      <div className="w-full flex justify-between gap-4 mt-4">
                        <Button
                          type="button"
                          onClick={handlePreviousStep}
                          disabled={currentStep === 0}
                          variant="outline"
                          size="icon"
                          className={cn("", currentStep === 0 && "invisible")}
                        >
                          <ArrowBigLeft />
                          <span className="sr-only">Previous</span>
                        </Button>
                        <Button
                          type="submit"
                          variant="outline"
                          size="icon"
                          disabled={currentStep === steps.length - 1}
                          className={cn(
                            currentStep === steps.length - 1 && "hidden"
                          )}
                        >
                          <ArrowBigRight />
                          <span className="sr-only">Next</span>
                        </Button>
                      </div>
                    </DialogFooter>
                  </form>
                </Form>
              </>
            )}
          </>
        ) : primaryCount === 2 ? (
          <RegisterMessage />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
