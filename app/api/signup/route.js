"use server"

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

    //database

    
    return new Response(JSON.stringify({ message: "User signed up successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })
}