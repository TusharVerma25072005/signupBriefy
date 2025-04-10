import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  signUpEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gmailEmail : {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);