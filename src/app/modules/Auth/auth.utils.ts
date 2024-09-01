import jwt from "jsonwebtoken";

export const createToken = (payload: { email: string, role: string }, secret: string, expiresIn: string) => jwt.sign(payload, secret, { expiresIn })