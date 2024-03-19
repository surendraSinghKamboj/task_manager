"use client";
import { FaBuilding } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState({});
  const [state, setState] = useState({ message: "", type: false });
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const router = useRouter();

  const submitRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Requires at least 1 lowercase letter, 1 uppercase letter, 1 digit, and is at least 8 characters long
    const contactRegex = /^\d{10}$/; // Assumes contact is a 10-digit number

    // Validation checks
    if (!data.name || !data.email || !data.password || !data.contact) {
      setState({ message: "All fields are required.", type: false });
      return;
    }
    if (!emailRegex.test(data.email)) {
      setState({ message: "Invalid email format.", type: false });
      return; // return after setting state to prevent further execution
    }
    if (!passwordRegex.test(data.password)) {
      setState({
        message:
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
        type: false,
      });
      return;
    }
    if (!contactRegex.test(data.contact)) {
      setState({
        message:
          "Invalid contact number format. It should be a 10-digit number.",
        type: false,
      });
      return;
    }
    try {
      const response = await axios.post("/api/v1/users/register", {
        data,
      });
      if (response.headers && response.headers.location) {
        const locationHeader = response.headers.location;
        router.replace(locationHeader);
      }
      const resData = response.data;
    } catch (error) {
      console.error("Error signing user:", error);
      setState({ message: "Error signing user.", type: false });
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-l from-primary-600 to-secondary-500 flex justify-start items-center flex-col">
      <span className="text-green-600 hidden bg-green-200"></span>
      <span className="text-red-600 hidden bg-red-200"></span>
      <div className={`min-h-8 absolute top-0 container mx-auto text-center`}>
        {state.message && (
          <span
            className={`${
              state.type
                ? "text-green-600 bg-green-200"
                : "text-red-600 bg-red-200"
            } px-2 rounded-md`}
          >
            {state.message}
          </span>
        )}
      </div>
      <form
        onSubmit={submitRegister}
        className="rounded-bl-full rounded-tr-full  bg-white px-96 pb-96 pt-32  flex flex-col justify-center items-center"
      >
        <FaBuilding className="text-8xl text-secondary-600" />
        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-secondary-600 placeholder:text-secondary-600"
          placeholder="Full name"
          type="text"
          name="name"
          required
          onChange={handleChange}
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-secondary-600 placeholder:text-secondary-600"
          placeholder="Enter your Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-secondary-600 placeholder:text-secondary-600"
          placeholder="Enter your Phone number"
          type="number"
          name="contact"
          required
          onChange={handleChange}
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md border-2 border-secondary-600 placeholder:text-secondary-600"
          type="password"
          placeholder="Enter your Password"
          name="password"
          required
          onChange={handleChange}
        />

        <input
          className="w-96 h-9 px-2 mt-2 rounded-md cursor-pointer border-2 border-secondary-600 hover:bg-secondary-600 hover:text-white transition-all duration-500"
          type="submit"
          value="Register"
        />
        <p className="mt-4">
          Already Registered{" "}
          <Link href={"/"} className="text-secondary-600">
            Login now !
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
