"use server";

import fromSchema from "./formSchemas";
import dbConnect from "@/lib/dbConnect";
import HackathonModal from "@/Models/HackathonModel";
import { z } from "zod";

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
