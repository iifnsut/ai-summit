"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

function EventFormStep({ form }: { form: ReturnType<typeof useForm> }) {
  return (
    <div className="grid gap-4 py-4 mx-auto w-11/12">
      <FormField
        name="name"
        control={form.control}
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="email"
        control={form.control}
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="contact"
        control={form.control}
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact No.</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="whatsapp"
        control={form.control}
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp No.</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="college"
        control={form.control}
        defaultValue={""}
        render={({ field }) => (
          <FormItem>
            <FormLabel>College</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
        <h1 className="text-4xl font-bold text-center">🎉Registered🎉</h1>
        <p className="text-lg mt-4">
          Your registration has been confirmed successfully.
        </p>
        <p className="text-sm sm:text-base">
          We will notify you about the event details soon.
        </p>
      </div>
    </div>
  );
}

export { EventFormStep, RegisterMessage };
