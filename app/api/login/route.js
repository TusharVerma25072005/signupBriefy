import connectToDatabase from "./../../../mongoose";
import User from "./../../../model";


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

        const user = await User.findOne({signUpEmail: email , password: password});
        console.log("User:", user);
        if(!user){
            return new Response("Invalid email or password", {status: 401});
        }
        const {accessToken, refreshToken, gmailEmail } = user;

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        console.log("Gmail Email:", gmailEmail);

        return new Response(
            JSON.stringify({
              message: "Login successful",
              accessToken,
              refreshToken,
              gmailEmail: signUpEmail,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );


    }catch(error){
        console.error("Error in login route:", error);
        return new Response(JSON.stringify({
            message: "Internal server error"
        }), { status: 500 });
    }
}