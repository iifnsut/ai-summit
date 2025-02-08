import mongoose, { Document, Schema } from "mongoose";

interface IHackathon extends Document {
  googleId: string;
  googleEmail: string;
  teamName: string;
  teamLeaderName: string;
  teamLeaderMobile: string;
  teamLeaderWhatsApp: string;
  teamLeaderEmail: string;
  collegeName: string;
  teamMembers: {
    name: string;
    contact: string;
    email: string;
  }[];
  problemStatementId: string;
  ideaDescription: string;
  prototypeYouTubeLink: string;
  presentationFile: string;
  status: "pending" | "submitted" | "approved" | "rejected";
  completedSteps: number;
}

const hackathonSchema = new Schema<IHackathon>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    googleEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    teamLeaderName: {
      type: String,
      required: true,
      trim: true,
    },
    teamLeaderMobile: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      minlength: 10,
    },
    teamLeaderWhatsApp: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      minlength: 10,
    },
    teamLeaderEmail: {
      type: String,
      required: true,
      trim: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    teamMembers: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        contact: {
          type: String,
          required: true,
          trim: true,
          maxlength: 10,
          minlength: 10,
        },
        email: { type: String, required: true, trim: true },
      },
    ],
    problemStatementId: {
      type: String,
      trim: true,
    },
    ideaDescription: {
      type: String,
      trim: true,
    },
    prototypeYouTubeLink: {
      type: String,
      trim: true,
    },
    presentationFile: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "submitted", "approved", "rejected"],
    },
    completedSteps: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const HackathonModal =
  (mongoose.models.Hackathon as mongoose.Model<IHackathon>) ||
  mongoose.model<IHackathon>("Hackathon", hackathonSchema);

export default HackathonModal;
