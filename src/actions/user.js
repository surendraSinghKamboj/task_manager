"use server";

// import { connectToDatabase } from "@/db/dbconnect";
// import { generateToken } from "@/libs/token_generator";
// import generateSHA512 from "@/libs/sha_hash";
// import User from "@/models/Users";
import { redirect } from "next/navigation";


export async function register(currentState, formData) {
 

  // Regular expressions for validation
  

  const data = { name, email, contact, password, role: "user" };

 
}

export async function login(currentState, formData) {
  
}

export async function verify(email, verificationCode) {}
