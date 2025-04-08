"use server"

import connectToDatabase from "./../../../mongoose";
import User from "./../../../model";

export async function POST(request){
    const {email, password} = await request.json();

    if (!email || !password) {
        return new Response(JSON.stringify({ message: "Email and password are required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    console.log("Email:", email);
    console.log("Password:", password);

    await connectToDatabase();

    const existingUser = await User.findOne({ email })
    if(existingUser) {
        return new Response(JSON.stringify({ message: "User already exists" }), {
            status: 409,
            headers: { "Content-Type": "application/json" },
        });
    }

    const newUser = new User({ email, password });
    await newUser.save()

    console.log("User created:", newUser);

    

    
    return new Response(JSON.stringify({ message: "User signed up successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}