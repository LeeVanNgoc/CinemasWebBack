require("dotenv").config();
import User from "../models/User";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { createJWT } from "../middlewares/jwtAction";
import { sendOTP } from "../middlewares/mailer";
import { generateOtp, deleteOtp, getOtpByEmail } from "./otpService";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password: string) => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw new Error("Hashing failed");
  }
};

const setDecentralization = async (role: string) => {
  try {
    if (role !== "admin" && role !== "staff" && role !== "headquaters") {
      role = "user";
    }
    return role;
  } catch (error) {
    console.error("Error setting decentralization:", error);
    throw error;
  }
};

export const createUser = async (data: any) => {
  try {
    const existingIds = await User.findAll({
      attributes: ["userId"],
      order: [["userId", "ASC"]],
    });

    const ids = existingIds.map((user) => user.userId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }
    const existingUser = await User.findOne({ where: { email: data.email } });

    const existingCodes = await User.findAll({
      attributes: ["userCode"],
      order: [["userCode", "ASC"]],
    });

    const codes = existingCodes.map((user) => user.userCode);
    let newCode = "US001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "US00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "US0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "US" + newId;
      }
    }

    if (existingUser) {
      return {
        errCode: 4,
        message: "Email already exists",
      };
    } else {
      const hashPassword = await hashUserPassword(data.password);
      const role = await setDecentralization(data.role);
      const newUser = await User.create({
        userId: newId,
        userCode: newCode,
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        birthYear: data.birthYear,
        phonenumber: data.phonenumber,
        role: role,
        city: data.city,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (newUser) {
        return {
          user: newUser,
          errCode: 0,
          message: "User created successfully",
        };
      } else {
        return {
          errCode: 2,
          message: "Failed to create user",
        };
      }
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating user ${error}`,
    };
  }
};

export const deleteUser = async (userCode: string) => {
  try {
    const user = await User.findOne({
      where: { userCode: userCode },
    });

    if (!user) {
      return {
        errorCode: 1,
        errorMessage: "Not found user",
      };
    } else {
      await user.destroy();

      return {
        errorCode: 0,
        errorMessage: "User deleted successfully",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error delete user: ${error}`,
    };
  }
};

export const editUser = async (data: any) => {
  const userCode = data.userCode;
  try {
    if (!userCode) {
      return {
        errCode: 4,
        message: "Missing required parameters!",
      };
    }

    const user = await User.findOne({ where: { userCode: userCode } });

    if (!user) {
      return {
        errorCode: 1,
        message: "User not found!",
      };
    }
    user.firstName = data.firstName || user.firstName;
    user.lastName = data.lastName || user.lastName;
    user.userName = data.userName || user.userName;
    user.phonenumber = data.phonenumber || user.phonenumber;
    user.birthYear = data.birthYear || user.birthYear;
    await user.save();
    return {
      errorCode: 0,
      message: "Update user successfully",
      user: user,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error updating user: ${error}`,
      user: null,
    };
  }
};

export const getUserById = async (userCode: string) => {
  let users: any = "";
  try {
    users = await User.findOne({
      where: {
        userCode: userCode,
      },
      attributes: [
        "userCode",
        "email",
        "firstName",
        "lastName",
        "birthYear",
        "userName",
        "phonenumber",
      ],
      raw: true,
    });
    return {
      errCode: 0,
      message: "Get user success",
      users: users,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error went get user ${error}`,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: [
        "userCode",
        "email",
        "firstName",
        "lastName",
        "birthYear",
        "userName",
        "phonenumber",
      ],
      raw: true,
    });
    return {
      errCode: 0,
      message: "Get all users success",
      users: users,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error went get user ${error}`,
    };
  }
};

const checkUserEmail = async (userEmail: string): Promise<boolean> => {
  try {
    const user = await User.findOne({
      where: { email: userEmail },
    });
    return !!user;
  } catch (error) {
    throw error;
  }
};

// Hàm đăng nhập
export const loginAPI = async (userEmail: string, userPassword: string) => {
  try {
    const userData: any = {};
    const isExists = await checkUserEmail(userEmail);

    if (isExists) {
      const user = await User.findOne({
        attributes: ["email", "password", "role", "userCode"],
        where: { email: userEmail },
        raw: true,
      });

      if (user) {
        const check = await bcrypt.compareSync(userPassword, user.password);

        if (check) {
          // Xóa password để tránh bảo mật thông tin
          delete userData.password;
          userData.user = user;
          return {
            userCode: user.userCode,
            role: user.role,
            errCode: 0,
            message: "Login success",
          };
        } else {
          return {
            errCode: 5,
            message: "Password is incorrect",
          };
        }
      } else {
        return {
          errCode: 1,
          message: "User not found",
        };
      }
    } else {
      return {
        errCode: 2,
        message:
          "Your email does not exist in the system. Please try another email",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error login: ${error}`,
    };
  }
};

export const getUserByCity = async (city: string) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { city: city },
              { city: { [Op.is]: null } },
              { city: { [Op.eq]: "" } },
            ],
          },
          { role: { [Op.ne]: "headquaters" } }, // Loại bỏ role là 'headquaters'
        ],
      },
      attributes: [
        "userCode",
        "email",
        "birthYear",
        "userName",
        "role",
        "phonenumber",
      ],
      raw: true,
    });
    return {
      errCode: 0,
      message: "Get users by city success",
      users: users,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get users by city: ${error}`,
    };
  }
};

export const loginUseJWT = async (userEmail: string, userPassword: string) => {
  try {
    const userData: any = {};
    const isExists = await checkUserEmail(userEmail);

    if (isExists) {
      const user = await User.findOne({
        attributes: ["email", "password", "role", "userCode", "city"],
        where: { email: userEmail },
        raw: true,
      });

      if (user) {
        const check = await bcrypt.compareSync(userPassword, user.password);

        if (check) {
          // Xóa password để tránh bảo mật thông tin
          delete userData.password;
          userData.user = user;
          let payload = {
            userCode: user.userCode,
            userEmail: user.email,
            role: user.role,
            city: user.city,
            expiresIn: process.env.JWT_EXPIRES_IN,
          };
          const token = await createJWT(payload);
          const otp = await sendOTP(userEmail);
          if (otp) {
            console.log("OTP sent successfully:", otp);
          } else {
            console.log("Failed to send OTP.");
          }
          return {
            token: token,
            data: {
              userCode: user.userCode,
              role: user.role,
              city: user.city,
            },
            otp: otp,
            errCode: 0,
            message: "Login success",
          };
        } else {
          return {
            errCode: 5,
            message: "Password is incorrect",
          };
        }
      } else {
        return {
          errCode: 1,
          message: "User not found",
        };
      }
    } else {
      return {
        errCode: 2,
        message:
          "Your email does not exist in the system. Please try another email",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error login use JWT: ${error}`,
    };
  }
};

export const getOTPRequestPasswords = async (userEmail: string) => {
  try {
    const user = await User.findOne({
      where: { email: userEmail },
      raw: true,
    });
    if (user) {
      const otpGmail = await sendOTP(userEmail);
      if (otpGmail) {
        console.log(otpGmail);
        const otpCode = String(otpGmail);
        await generateOtp(userEmail, otpCode);
        return {
          errCode: 0,
          message: "OTP sent successfully",
          otp: otpGmail,
        };
      } else {
        return {
          errCode: 4,
          message: "Failed to send OTP",
        };
      }
    } else {
      return {
        errCode: 1,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get OTP request passwords: ${error}`,
    };
  }
};
// Hàm đăng nhập
export const requestPasswords = async (userEmail: string, otpCode: string) => {
  try {
    const userData: any = {};
    const isExists = await checkUserEmail(userEmail);

    if (isExists) {
      const user = await User.findOne({
        where: { email: userEmail },
        attributes: ["email", "password", "role", "userCode", "city"],
        raw: true,
      });
      if (user) {
        const otpGmail = await getOtpByEmail(userEmail);
        const otpGmailCheck = String(otpGmail.data?.otpCode);

        if (otpGmailCheck === otpCode) {
          // Xóa password để tránh bảo mật thông tin
          delete userData.password;
          userData.user = user;
          let payload = {
            userCode: user.userCode,
            userEmail: user.email,
            role: user.role,
            city: user.city,
            expiresIn: process.env.JWT_EXPIRES_IN,
          };
          const token = await createJWT(payload);
          await deleteOtp(userEmail);
          return {
            token: token,
            data: {
              userCode: user.userCode,
              role: user.role,
              city: user.city,
            },
            errCode: 0,
            message: "Login success",
          };
        } else {
          return {
            errCode: 4,
            message: "OTP is incorrect",
          };
        }
      }
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error login: ${error}`,
    };
  }
};
