"use client";

import { useFormState } from "react-dom";
import { register as action } from "@/actions/user";
import { FaBuilding } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [state, formAction] = useFormState(action, { message: "", type: true });

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <span className="text-green-600 hidden"></span>
      <span className="text-red-600 hidden"></span>
      <div className="h-8">
        {state.message && (
          <span className={`${state.type ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </span>
        )}
      </div>
      <form
        action={formAction}
        className="rounded-md flex flex-col justify-center items-center"
      >
        <FaBuilding className="text-8xl text-purple-600" />
        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600"
          placeholder="Full name"
          type="text"
          name="name"
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600"
          placeholder="Enter your Email"
          type="email"
          name="email"
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600"
          type="password"
          placeholder="Enter your Password"
          name="password"
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md cursor-pointer border-2 border-purple-600 hover:bg-purple-600 hover:text-white"
          type="submit"
          value="Register"
        />
      </form>
      <p className="mt-4">
        Already Registered{" "}
        <Link href={"/"} className="text-purple-600">
          Login now !
        </Link>{" "}
      </p>
    </div>
  );
}
