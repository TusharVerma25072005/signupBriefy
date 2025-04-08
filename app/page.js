"use client"

import { useState } from "react";
export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    if (res.ok) {
      const params = new URLSearchParams(
        {
          client_id: "372336145739-77bjeccr2k09o29mivm13bbhfc0epoiv.apps.googleusercontent.com",
          redirect_uri: "",
          response_type: "code",
          scope: "https://www.googleapis.com/auth/gmail.readonly email profile",
          access_type: "offline",
          prompt: "consent"
        }
      )
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

      console.log("Signup successful");
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <div >
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}>
      <h1 style={{
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#333",
      }}>
        Sign Up
      </h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
        onChange={(e) => setEmail(e.target.value)}
        ></input>
      <input
        type="password"
        placeholder="Password"
        value={password}
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
        onChange={(e) => setPassword(e.target.value)}
        ></input>
      <button 
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}

        onClick={handleSubmit}
        >Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
