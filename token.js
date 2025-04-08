import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    access_token: { type: String, required: true },
    refresh_token: { type: String },
    expiry_date: { type: Number }
}, { timestamps: true }
);


export default mongoose.models.Token || mongoose.model("Token", TokenSchema);

