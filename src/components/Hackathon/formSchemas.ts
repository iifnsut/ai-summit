import { z } from "zod";

const from1Schema = z.object({
  teamName: z.string().min(3, "Team name should be atleast 3 characters long"),
  teamLeaderName: z.string().min(3, "Team leader name required"),
  teamLeaderMobile: z
    .string()
    .nonempty()
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  teamLeaderWhatsApp: z
    .string()
    .nonempty()
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  teamLeaderEmail: z.string().nonempty(),
  collegeName: z.string().nonempty(),
  membersCount: z.preprocess(
    (val) => Number(val) || 3,
    z.number().min(3).max(4)
  ),
});

const from2Schema = z.object({
  teamMembers: z
    .array(
      z.object({
        name: z.string().nonempty(),
        contact: z
          .string()
          .nonempty()
          .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
        email: z.string().nonempty(),
      })
    )
    .min(3, "Minimum 3 team members required")
    .max(4, "Maximum 4 team members allowed"),
});

const from3Schema = z.object({
  problemStatementId: z.string().min(1, "Select a problem statement"),
  ideaDescription: z
    .string()
    .min(10, "Idea description should be atleast 10 characters long")
    .max(500, "Idea description should be less than 500 characters"),
    presentationFile: z.string().min(2, "Upload a presentation file").url(),
    prototypeYouTubeLink: z.string().min(2, "Enter a valid youtube link").url(),
});

export { from1Schema, from2Schema, from3Schema };
