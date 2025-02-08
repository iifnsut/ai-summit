import mongoose, { Document, Schema } from "mongoose";

interface IEvent extends Document {
  googleId: string;
  googleEmail: string;
  name: string;
  email: string;
  contact: string;
  whatsapp: string;
  college?: string;
}

const EventSchema: Schema = new Schema({
  googleId: { type: String, required: true, unique: true, index: true },
  googleEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  contact: { type: String, required: true, match: /^[6-9]\d{9}$/ },
  whatsapp: { type: String, required: true, match: /^[6-9]\d{9}$/ },
  college: { type: String, required: false },
});

const EventModal =
  (mongoose.models.Event as mongoose.Model<IEvent>) ||
  mongoose.model<IEvent>("Event", EventSchema);

export default EventModal;
