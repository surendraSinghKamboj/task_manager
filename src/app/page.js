"use client";

import { useFormState } from "react-dom";
import { login as action } from "@/actions/user";
import { FaBuilding } from 'react-icons/fa'
import Link from 'next/link'

export default function Home() {
  
  const [state, formAction] = useFormState(action, null);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <form
        action={formAction}
        className="rounded-md flex flex-col justify-center items-center"
      >
        <FaBuilding className="text-8xl text-purple-600" />
        <input className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600" placeholder="Enter your Email"  type="email" name="email" />
        <input className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600" type="password" placeholder="Enter your Password" name="password" />
        <input className="w-96 h-9 px-2 mt-2 rounded-md cursor-pointer border-2 border-purple-600 hover:bg-purple-600 hover:text-white" type="submit" value="Login now" />
      </form>
      <p className="mt-4">New user <Link href={"/register"} className="text-purple-600">Register now !</Link> </p>

    </div>
  );
}
