"use client";

import { FaBuilding } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState({});
  const [state, setState] = useState({ message: "", type: false });
  const router = useRouter()

  const handleChnage = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submitLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if (!data.email || !data.password) {
      setState({ message: "All fields are required.", type: false });
      return;
    }
    if (!emailRegex.test(data.email)) {
      setState({ message: "Invalid email format.", type: false });
      return; // return after setting state to prevent further execution
    }

    try {
      console.log("sending");
      const response = await axios.post("/api/v1/users/login", {
        data,
      });
      if (response.headers && response.headers.location) {
        const locationHeader = response.headers.location;
        router.push(locationHeader);
      }
      const resData = response.data;
    } catch (error) {
      console.error("Error signing user:", error);
      setState({ message: "Error signing user.", type: false });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <form
        onSubmit={submitLogin}
        className="rounded-md flex flex-col justify-center items-center"
      >
        <FaBuilding className="text-8xl text-purple-600" />
        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600"
          placeholder="Enter your Email"
          type="email"
          name="email"
          required
          onChange={handleChnage}
        />
        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-purple-600 placeholder:text-purple-600"
          type="password"
          placeholder="Enter your Password"
          name="password"
          required
          onChange={handleChnage}
        />
        <input
          className="w-96 h-9 px-2 mt-2 rounded-md cursor-pointer border-2 border-purple-600 hover:bg-purple-600 hover:text-white"
          type="submit"
          value="Login now"
        />
      </form>
      <p className="mt-4">
        New user{" "}
        <Link href={"/register"} className="text-purple-600">
          Register now !
        </Link>{" "}
      </p>
    </div>
  );
}
