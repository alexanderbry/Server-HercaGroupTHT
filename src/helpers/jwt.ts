import jwt from "jsonwebtoken";
const secret_key = process.env.SECRET_KEY!;

let createToken = (payload: string | object) => jwt.sign(payload, secret_key);
let verifyToken = (token: string) => jwt.verify(token, secret_key);

export { createToken, verifyToken };
