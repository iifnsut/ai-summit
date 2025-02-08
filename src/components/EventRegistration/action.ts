"use server";

import { currentUser } from "@clerk/nextjs/server";

import { formSchema } from "./formSchem";
import dbConnect from "@/lib/dbConnect";
import EventModal from "@/Models/EventModal";
import { z } from "zod";

export async function registerEvent({
  data,
}: {
  data: z.infer<typeof formSchema>;
}) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!userId) {
      return {
        success: false,
        message: "Please login to continue",
        error: "unauthorized",
      };
    }

    await dbConnect();

    const eventData = await EventModal.findOne({ googleId: userId });
    if (eventData) {
      return {
        success: false,
        message: "You have already registered for the event",
        error: "registered",
      };
    }

    const validData = formSchema.parse(data);
    const newEvent = new EventModal({
      googleId: userId,
      googleEmail: userEmail,
      name: validData.name,
      email: validData.email,
      contact: validData.contact,
      whatsapp: validData.whatsapp,
    });
    if (validData.college) {
      newEvent.college = validData.college;
    }
    await newEvent.save();
    return {
      success: true,
      message: "Registration Successful",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: "Event Registration Failed",
      error: "internal",
    };
  }
}

export async function isAlreadyRegistered() {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        success: false,
        message: "Please login to continue",
        error: "unauthorized",
      };
    }

    await dbConnect();

    const eventData = await EventModal.findOne({ googleId: userId }).lean();
    if (eventData) {
      return {
        success: true,
        message: "You have already registered for the event",
      };
    }
    return {
      success: false,
      message: "You have not registered for the event",
      error: "not-registered",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return {
      success: false,
      message: "Event Registration Failed",
      error: "internal",
    };
  }
}
