"use server";

import { currentUser } from "@clerk/nextjs/server";

import {
  from1Schema as from1,
  from2Schema as from2,
  from3Schema as from3,
} from "./formSchemas";
import dbConnect from "@/lib/dbConnect";
import HackathonModal from "@/Models/HackathonModel";
import { z } from "zod";
import fromSchema from "./formSchemas";

export async function saveHackathonData({
  data,
  step,
}: {
  data: z.infer<typeof from1> | z.infer<typeof from2> | z.infer<typeof from3>;
  step: number;
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

    const hackathonData = await HackathonModal.findOne({ googleId: userId });
    if (hackathonData && hackathonData?.status !== "pending") {
      return {
        success: false,
        message: "You have already submitted the form",
        error: "submitted",
      };
    }

    if (step === 0) {
      const validData = from1.parse(data);
      if (!user) {
        return {
          success: false,
          message: "User not found",
          error: "unauthorized",
        };
      }

      if (hackathonData) {
        hackathonData.teamName = validData.teamName;
        hackathonData.teamLeaderName = validData.teamLeaderName;
        hackathonData.teamLeaderMobile = validData.teamLeaderMobile;
        hackathonData.teamLeaderWhatsApp = validData.teamLeaderWhatsApp;
        hackathonData.teamLeaderEmail = validData.teamLeaderEmail;
        hackathonData.collegeName = validData.collegeName;
        hackathonData.completedSteps = Math.max(
          step,
          hackathonData.completedSteps
        );
        await hackathonData.save();
      } else {
        await HackathonModal.create({
          googleId: userId,
          googleEmail: userEmail,
          teamName: validData.teamName,
          teamLeaderName: validData.teamLeaderName,
          teamLeaderMobile: validData.teamLeaderMobile,
          teamLeaderWhatsApp: validData.teamLeaderWhatsApp,
          teamLeaderEmail: validData.teamLeaderEmail,
          collegeName: validData.collegeName,
        });
      }
    } else {
      if (!hackathonData) {
        return {
          success: false,
          message: "Please fill the first step first",
          error: "incomplete",
        };
      }

      if (step === 1) {
        const validData = from2.parse(data);
        hackathonData.teamMembers = validData.teamMembers;
        hackathonData.completedSteps = Math.max(
          step,
          hackathonData.completedSteps
        );
        await hackathonData.save();
      } else if (step === 2) {
        const validData = from3.parse(data);
        hackathonData.problemStatementId = validData.problemStatementId;
        hackathonData.ideaDescription = validData.ideaDescription;
        hackathonData.prototypeYouTubeLink = validData.prototypeYouTubeLink;
        hackathonData.presentationFile = validData.presentationFile;
        hackathonData.completedSteps = Math.max(
          step,
          hackathonData.completedSteps
        );
        await hackathonData.save();
      } else {
        return {
          success: false,
          message: "Invalid step",
          error: "invalid_step",
        };
      }
    }

    return { success: true, message: "Updated successfully" };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return {
      success: false,
      message: "Something went wrong",
      error: "server_error",
    };
  }
}

export async function getHackathonData() {
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

    const hackathonData = await HackathonModal.findOne({ googleId: userId })
      .lean()
      .exec();
    if (!hackathonData) {
      return {
        success: false,
        message: "Data not found",
        error: "not_found",
      };
    }

    // Convert _id fields to strings
    hackathonData._id = hackathonData._id.toString();
    hackathonData.teamMembers = hackathonData.teamMembers.map(
      (member: any) => ({
        ...member,
        _id: member._id.toString(),
      })
    );

    return { success: true, data: hackathonData };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return {
      success: false,
      message: "Something went wrong",
      error: "server_error",
    };
  }
}

export async function markFinalSubmission() {
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

    const hackathonData = await HackathonModal.findOne({ googleId: userId });
    if (!hackathonData) {
      return {
        success: false,
        message: "Data not found",
        error: "not_found",
      };
    }

    if (hackathonData.status === "submitted") {
      return {
        success: false,
        message: "Already submitted",
        error: "submitted",
      };
    }

    if (hackathonData.completedSteps < 2) {
      return {
        success: false,
        message: "Please complete all the steps",
        error: "incomplete",
      };
    }

    hackathonData.status = "submitted";
    await hackathonData.save();

    return { success: true, message: "Submitted successfully" };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return {
      success: false,
      message: "Something went wrong",
      error: "server_error",
    };
  }
}

export async function saveCombinedData(data: z.infer<typeof fromSchema>) {
  try {
    const safeData = fromSchema.parse(data);
    await dbConnect();
    const newHackathon = new HackathonModal({
      teamName: safeData.teamName,
      teamLeaderName: safeData.teamLeaderName,
      teamLeaderMobile: safeData.teamLeaderMobile,
      teamLeaderWhatsApp: safeData.teamLeaderWhatsApp,
      teamLeaderEmail: safeData.teamLeaderEmail,
      collegeName: safeData.collegeName,
      teamMembers: safeData.teamMembers,
      problemStatementId: safeData.problemStatementId,
      ideaDescription: safeData.ideaDescription,
      prototypeYouTubeLink: safeData.prototypeYouTubeLink,
      presentationFile: safeData.presentationFile,
    });
    await newHackathon.save();
    return { success: true, message: "Submitted successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }
    return {
      success: false,
      message: "Something went wrong",
      error: "server_error",
    };
  }
}
