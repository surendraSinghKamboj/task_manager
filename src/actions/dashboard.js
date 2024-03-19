"use server"
import { verifyToken } from "@/libs/verify_token";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const fetchDashboardDetails = async () => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }

  return { user: { name: verify.decoded.name } };
};
