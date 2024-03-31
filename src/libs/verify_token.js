import jwt from "jsonwebtoken";
import User from "@/models/Users";
import { connectToDatabase } from "@/db/dbconnect";

export async function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);

    await connectToDatabase();
    const user = await User.findById(decoded._id);

    if (!user) {
      console.log("!user");
      return {
        valid: false,
        error: err.message,
      };
    }

    return {
      valid: true,
      decoded: {
        ...decoded,
        name: user.name, 
      },
    };
  } catch (err) {
    console.log("Catch");
    return {
      valid: false,
      error: err.message,
    };
  }
}
