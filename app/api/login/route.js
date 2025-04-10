import connectToDatabase from "./../../../mongoose";

export async function POST(request){
    try{
        const {email , password} = await request.json();
        console.log("Email:", email);
        console.log("Password:", password);
        if(!email || !password){
            return new Response("Email and password are required", {status: 400});
        }

        await connectToDatabase();
        console.log("Connected to database");
        

    }catch(error){
        console.error("Error in login route:", error);
        return new Response("Error in login route", { status: 500 });
    }
}