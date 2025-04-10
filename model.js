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
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);