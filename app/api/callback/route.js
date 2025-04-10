import { google } from "googleapis";
import User from "./../../../model";
import connectToDatabase from "../../../mongoose";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const [email, password] = state.split("::");
  if (!code) {
    console.log("No code provided");
    return new Response("No code provided", { status: 400 });
  }

  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log(process.env.GOOGLE_CLIENT_SECRET);
  console.log(process.env.GOOGLE_REDIRECT_URI);

  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });

    console.log("OAuth2 client created");
    console.log("Code:", code);
    console.log("Oauth2 client:", oauth2Client);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: "me" });

    console.log("Tokens:", tokens);
    console.log("Email:", profile.data.emailAddress);

    await connectToDatabase();
    console.log("Connected to database");
   
    const ExistingUser = await User.findOne({ signUpEmail : email});

    console.log("Existing User:", ExistingUser);
    if(ExistingUser){
      ExistingUser.access_token = tokens.access_token;
      ExistingUser.refresh_token = tokens.refresh_token;
      ExistingUser.expiry_date = tokens.expiry_date;
      await ExistingUser.save();
    }else{
      const newUser = new User({
        signUpEmail: email,
        signUpPassword: password,
        gmailEmail: profile.data.emailAddress,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      });
      await newUser.save();
    }

    return Response.redirect("briefy://");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return new Response("Error exchanging code for tokens", { status: 500 });
  }
}
