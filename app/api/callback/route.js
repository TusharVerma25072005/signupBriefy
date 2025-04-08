import { NextRequest } from "next/server";
import {google } from "googleapis";

export async function GET(request) {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
        console.log("No code provided");
        return new Response("No code provided", { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2({
        clientId: "372336145739-77bjeccr2k09o29mivm13bbhfc0epoiv.apps.googleusercontent.com",
        clientSecret: "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",
        redirectUri: "https://yourdomain.com/api/callback",
    });

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