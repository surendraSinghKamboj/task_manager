import jwt from "jsonwebtoken";

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    return {
      valid: true,
      decoded: decoded,
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message,
    };
  }
}
