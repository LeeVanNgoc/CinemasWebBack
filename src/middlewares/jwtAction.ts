require("dotenv").config();
import jwt from "jsonwebtoken";

const secretToken = process.env.JWT_SECRET || "superSecretKey";
export const createJWT = (payload: any) => {
  let key = secretToken;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

export const verifyJWT = (token: any) => {
  let key = secretToken;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};
