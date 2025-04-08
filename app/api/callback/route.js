import { google } from "googleapis";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");
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

    return Response.redirect("briefy://auth?success=true");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return new Response("Error exchanging code for tokens", { status: 500 });
  }
}
