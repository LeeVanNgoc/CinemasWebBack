import e, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUserByCode,
  getAllUsers,
  loginAPI,
  loginUseJWT,
  requestPasswords,
  getOTPRequestPasswords,
} from "../services/userService";
import { date } from "joi";

const handleCreateUser = async (req: Request, res: Response) => {
  const data = req.query;
  console.log(data);
  try {
    const newUser = await createUser(data);
    if (newUser.errCode === 0) {
      res.status(201).json({
        errCode: newUser.errCode,
        message: newUser.message,
      });
    } else {
      res.status(400).json({
        errCode: newUser.errCode,
        message: newUser.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Something was wrong in creating new user ${error}` });
  }
};

const handleDeleteUser = async (req: Request, res: Response) => {
  const userCode = req.query.userCode as string;
  if (!userCode) {
    return res.status(400).json({ message: "Invalid user ID" }); // Xử lý khi ID không hợp lệ
  }
  try {
    const result = await deleteUser(userCode);
    if (result.errCode === 0) {
      res.status(201).json({
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(201).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Something went wrong deleted ${error}` });
  }
};

const handleEditUser = async (req: Request, res: Response) => {
  const data = req.query;
  try {
    const result: any = await editUser(data);
    if (result.errCode === 0) {
      return res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        user: result.user,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
        user: result.user,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error update user: ${error}` });
  }
};

const handleGetUserById = async (req: Request, res: Response) => {
  const userCode = req.query.userCode as string;

  try {
    if (!userCode) {
      res.status(400).json({ error: "Pleate complete user id" });
    }
    const user = await getUserByCode(userCode);
    if (user.errCode === 0) {
      res.status(200).json({
        errCode: user.errCode,
        message: user.message,
        user: user.users,
      });
    } else {
      res.status(404).json({
        errCode: user.errCode,
        message: user.message,
        user: user.users,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went get all user ${error} ` });
  }
};

const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAllUsers();
    if (data.errCode === 0) {
      res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        users: data.users,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleLoginUser = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;
    const userPassword = req.query.password as string;

    // Kiểm tra email và password có tồn tại không
    if (!userEmail) {
      res.status(400).json({ error: "Email are required" });
    }

    if (!userPassword) {
      res.status(400).json({ error: "Password are required" });
    }

    // Gọi API đăng nhập và xử lý kết quả
    const result = await loginAPI(userEmail, userPassword);

    if (result.errCode === 0) {
      res.status(200).json({
        userCode: result.userCode,
        role: result.role,
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(401).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went login ${error}` });
  }
};

const handleLoginUserWithJWT = async (req: Request, res: Response) => {
  const userEmail = String(req.query.userEmail);
  const userPassword = String(req.query.userPassword);
  try {
    const result = await loginUseJWT(userEmail, userPassword);
    if (result.errCode === 0) {
      res.status(200).json({
        token: result.token,
        data: result.data,
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(401).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went login with JWT ${error}` });
  }
};

const handleRequestPasswords = async (req: Request, res: Response) => {
  const userEmail = String(req.query.userEmail);
  const otpCode = String(req.query.otpCode);
  try {
    const result = await requestPasswords(userEmail, otpCode);
    if (result?.errCode === 0) {
      res.status(200).json({
        token: result.token,
        data: result.data,
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result?.errCode,
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went request passwords ${error}` });
  }
};

const handleForgotPassword = async (req: Request, res: Response) => {
  const userEmail = String(req.query.userEmail);
  try {
    const result = await getOTPRequestPasswords(userEmail);
    if (result.errCode === 0) {
      res.status(200).json({
        otp: result.otp,
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went forgot password ${error}` });
  }
};

export default {
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
  handleGetUserById,
  handleGetAllUsers,
  handleLoginUser,
  handleLoginUserWithJWT,
  handleRequestPasswords,
  handleForgotPassword,
};
