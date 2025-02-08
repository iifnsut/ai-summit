"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignInButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import RegisterButton from "../buttons/registerButton";
import { Textarea } from "@/components/ui/textarea";

const problemStatements = [
  { id: "1", name: "Problem Statement 1" },
  { id: "2", name: "Problem Statement 2" },
  { id: "3", name: "Problem Statement 3" },
  { id: "4", name: "Problem Statement 4" },
];

function Step1({ form }: { form: ReturnType<typeof useForm> }) {
  return (
    <div className="grid gap-4 py-4 mx-auto w-11/12">
      <FormField
        name="teamName"
        control={form.control}
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Name</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="teamLeaderName"
        control={form.control}
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Leader Name</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="teamLeaderMobile"
        control={form.control}
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Leader Mobile</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="teamLeaderWhatsApp"
        control={form.control}
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Leader WhatsApp</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="teamLeaderEmail"
        control={form.control}
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team Leader Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="collegeName"
        control={form.control}
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>College Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="membersCount"
        control={form.control}
        defaultValue={0}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Members</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={"3"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"3"}>3</SelectItem>
                  <SelectItem value={"4"}>4</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step2({
  form,
  membersCount = 3,
}: {
  form: ReturnType<typeof useForm>;
  membersCount: number;
}) {
  return (
    <div className="grid gap-4 py-4 mx-auto w-11/12">
      {Array.from({ length: membersCount }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4"
        >
          <FormField
            name={`teamMembers.${index}.name`}
            control={form.control}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member {index + 1} Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`teamMembers.${index}.contact`}
            control={form.control}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member {index + 1} Contact</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`teamMembers.${index}.email`}
            control={form.control}
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member {index + 1} Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}

function Step3({ form }: { form: ReturnType<typeof useForm> }) {
  return (
    <div className="grid gap-4 py-4 mx-auto w-11/12">
      <FormField
        name="problemStatementId"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Problem Statement</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a problem statement" />
                </SelectTrigger>
                <SelectContent>
                  {problemStatements.map((problem) => (
                    <SelectItem key={problem.id} value={problem.id}>
                      {problem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="ideaDescription"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Idea Description</FormLabel>
            <FormControl>
              <Textarea {...field} className="h-32 resize-none" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="presentationFile"
        control={form.control}
        defaultValue="" // Ensure defaultValue is always a string
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation File Link</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="prototypeYouTubeLink"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prototype Video Link</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step4({ markSubmission }: { markSubmission: () => void }) {
  return (
    <div className="flex items-center justify-center m-4 md:mt-8 p-4 md:p-6 bg-opacity-25 rounded-lg">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          🎉Final Submission🎉
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Please press the submit button to submit your final form.
        </p>
        <Button
          className="rounded-full bg-blue-600 text-whiten hover:bg-opacity-80"
          size={"lg"}
          type="button"
          onClick={markSubmission}
        >
          Make Final Submission
        </Button>
        <p className="text-xs sm:text-sm text-red-500">
          Note: You can&apos;t modify the form after submission.
        </p>
      </div>
    </div>
  );
}

function RegisterMessage() {
  return (
    <div
      className={
        "flex items-center justify-center m-4 md:mt-8  p-4 md:p-6 bg-opacity-25 rounded-lg"
      }
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center">🎉Team Registered🎉</h1>
        <p className="text-lg mt-4">
          Your team has been successfully registered for the hackathon.
        </p>
        <p className="text-sm sm:text-base">
          We will notify you about the further steps via email and WhatsApp.
        </p>
      </div>
    </div>
  );
}

function LoginMessage() {
  return (
    <div
      className={
        "flex items-center justify-center m-4 md:mt-8 lg:p-8  p-4 md:p-6 bg-opacity-10 rounded-lg"
      }
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Please login to register!
        </h1>
        <SignInButton>
          <RegisterButton className="rounded-full flex-1 w-full">
            Register <ChevronRight />
          </RegisterButton>
        </SignInButton>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center m-4 md:mt-8 p-4 md:p-6 bg-opacity-25 rounded-lg">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Loading...
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Please wait while we submit your form.
        </p>
      </div>
    </div>
  );
}

export {
  Loading,
  LoginMessage,
  problemStatements,
  RegisterMessage,
  Step1,
  Step2,
  Step3,
  Step4,
};
