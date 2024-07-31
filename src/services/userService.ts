import User from '../models/User';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password: string) => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw new Error('Hashing failed');
  }
}

const setDecentralization = async (role: string) => {
  try {
    if (role !== 'admin') {
      role = 'user';
    }
    return role;
  } catch (error) {
    console.error('Error setting decentralization:', error);
    throw error;
  }
}

export const createUser = async (data: any) => {
    try {
      const existingIds = await User.findAll({
        attributes: ['userId'],
        order: [['userId', 'ASC']]
      });

      const ids = existingIds.map(user => user.userId);

      let newId = 1;
      while (ids.includes(newId)) {
        newId++;
      }
      const existingUser = await User.findOne({ where: { email: data.email } });

      if (existingUser) {
        return{ 
          errCode: 4,
          message: 'Email already exists'};
      } else {
        const hashPassword = await hashUserPassword(data.password);
        const role = await setDecentralization(data.role);
        const newUser = await User.create({
          userId: newId,
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          birthYear: data.birthYear,
          phonenumber: data.phonenumber,
          role: role,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        if(newUser) {
          return {
            user: newUser,
            errCode: 0,
            message: 'User created successfully'
          };
        }else {
          return {
            errCode: 2,
            message: 'Failed to create user'
          };
        }
      }
    } catch (error) {
      return{
        errCode: 3,
        message: `Error creating user ${error}`
      };
    }
};

export const deleteUser = async(userId : number) => {
    try {
      const user = await User.findOne({
      where: {userId : userId}
    });
  
      if (!user) {
        return({
          errorCode: 1,
          errorMessage: "Not found user"
        })
      } else {
        await user.destroy();
  
        return({
          errorCode: 0,
          errorMessage: "User deleted successfully"
        })
      }
    } catch (error) {
      return{
        errCode: 3,
        message: `Error delete user: ${error}`
      }
    }
};

export const editUser = async (data: any) => {
    const userId = data.userId;
    try {
      if (!userId) {
        return({ 
          errCode: 4,
          message: 'Missing required parameters!' });
      }

      const user = await User.findOne({ where: { userId : userId } });

      if (!user) {
        return({
          errorCode: 1,
           message: 'User not found!' 
          });
      }
      user.firstName = data.firstName || user.firstName;
      user.lastName = data.lastName || user.lastName;
      user.userName = data.userName || user.userName;
      user.phonenumber = data.phonenumber || user.phonenumber;
      user.birthYear = data.birthYear || user.birthYear;
      await user.save();
      return ({ 
        errorCode: 0,
        message: 'Update user successfully',
        user: user
      });
    } catch (error) {
      return{
        errCode: 3,
        message: `Error updating user: ${error}`,
        user: null,
      };
    }
};

export const getUserById = async(userId: number) => {
    let users: any = '';
    try {
        users = await User.findOne({
          where: {
            userId: userId,
          },
           attributes: [
            "userId",
            "email",
            "firstName",
            "lastName",
            "birthYear",
            "userName",
            "phonenumber",
          ],
          raw: true,
        });
      return{
        errCode: 0,
        message: 'Get user success',
        users: users
      };
    } catch (error) {
      return{
        errCode: 3,
        message: `Error went get user ${error}`
      };
    }
};

export const getAllUsers = async() => {
    try {
        const users = await User.findAll({
           attributes: [
            "userId",
            "email",
            "firstName",
            "lastName",
            "birthYear",
            "userName",
            "phonenumber",
          ],
        raw: true,
    });
      return{
        errCode: 0,
        message: 'Get all users success',
        users: users
      };
    } catch (error) {
      return{
        errCode: 3,
        message: `Error went get user ${error}`
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
          attributes: ['email', 'password', 'role', 'userId'],
          where: { email: userEmail },
          raw: true,
        });
        
        if (user) {
          const check = await bcrypt.compareSync(userPassword, user.password);
          
          if (check) {
            // Xóa password để tránh bảo mật thông tin
            delete userData.password;
            userData.user = user;
            return({
              userId: user.userId,
              role: user.role,
              errCode: 0,
              message: 'Login success',
            });
          } else {
            return({
              errCode: 5,
              message: 'Password is incorrect',
            });
          }
        } else {
          return({
            errCode: 1,
            message: 'User not found', 
          });
        }
      } else {
        return({
          errCode: 2,
          message: 'Your email does not exist in the system. Please try another email',
        });
      }
    } catch (error) {
      return{
        errCode: 3,
        message: `Error login: ${error}`,
      }; 
    }
};