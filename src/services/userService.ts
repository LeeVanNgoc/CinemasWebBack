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
      const existingUser = await User.findOne({ where: { email: data.email } });

      if (existingUser) {
        return{ 
          errCode: 2,
          message: 'Email already exists'};
      } else {
        const hashPassword = await hashUserPassword(data.password);
        const role = await setDecentralization(data.role);
        const newUser = await User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          birthYear: data.birthYear,
          phonenumber: hashPassword,
          role: role,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        if(newUser) {
          return {
            errCode: 0,
            message: 'User created successfully'
          };
        }else {
          return {
            errCode: 3,
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
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return resolve({ error: 'User not found!' });
      } else {
        user.email = data.firstName || user.email;
        await user.save();
      }

      resolve({ message: 'Update the user succeeds!', user });
    } catch (error) {
      console.error('Error updating user:', error);
      reject(error);
    }
  });
};

export const getAllUsersById = (userId: string | number) => {
  return new Promise(async (resolve, reject) => {
    let users: any = '';
    try {
      if (userId === 'ALL') {
        users = await User.findAll({
          attributes: ['email', 'firstName', 'lastName', 'phonenumber'],
        raw: true,
       });
      } else if (userId && userId !== 'ALL') {
        users = await User.findOne({
          where: {
            id: userId,
          },
          attributes: ['email', 'firstName', 'lastName', 'phonenumber'],
          raw: true,
        });
      }
      console.log(users);
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
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
  return new Promise(async (resolve, reject) => {
    try {
      const userData: any = {};
      const isExists = await checkUserEmail(userEmail);
      
      if (isExists) {
        const user = await User.findOne({
          attributes: ['email', 'password'],
          where: { email: userEmail },
          raw: true,
        });
        
        if (user) {
          const check = await bcrypt.compareSync(userPassword, user.password);
          
          if (check) {
            // Xóa password để tránh bảo mật thông tin
            delete userData.password;
            userData.user = user;
            resolve({
              success: true,
              user: userData.user,
            });
          } else {
            resolve({
              success: false,
              message: 'Password is incorrect',
            });
          }
        } else {
          resolve({
            success: false,
            message: 'User not found', 
          });
        }
      } else {
        resolve({
          success: false,
          message: 'Your email does not exist in the system. Please try another email',
        });
      }
    } catch (error) {
      reject(error); 
    }
  });
};