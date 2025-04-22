import connectToDatabase from "../../../mongoose";
import User from "../../../model";
import { google } from 'googleapis';

export async function POST(req) {
  try {
    console.log("Reached refresh token route");
    const body = await req.json();
    const { email } = body;
    console.log("Email:", email);
    console.log("Request body:", req.body);
    if (!email) {
      return new Response(JSON.stringify({ accessToken: null, error: "Email is required" }), {
        status: 400,
      });
    }

    await connectToDatabase();
    const user = await User.findOne({ gmailEmail: email });

    if (!user || !user.refreshToken) {
      return new Response(JSON.stringify({ accessToken: null, error: "User not found or missing refresh token" }), {
        status: 404,
      });
    }
    console.log("User found:", user);
    console.log("Refresh Token:", user.refreshToken);

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: user.refreshToken,
    });

    const { credentials } = await oAuth2Client.refreshAccessToken();

    user.accessToken = credentials.access_token;
    user.expiryDate = credentials.expiry_date;
    await user.save();
    console.log("New Access Token:", credentials.access_token);
    return new Response(JSON.stringify({ accessToken: credentials.access_token }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error in refresh token route:", error);
    return new Response(JSON.stringify({ accessToken: null, error: "Internal server error" }), {
      status: 500,
    });
  }
}
