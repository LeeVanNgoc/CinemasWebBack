import e, { Request, Response } from 'express';
import {createUser, deleteUser, editUser, getUserById, getAllUsers, loginAPI} from '../services/userService';


const handleCreateUser = async (req: Request, res: Response) => {
	const data = req.query;
	console.log(data);
	try {
	  const newUser = await createUser(data);
	  if (newUser.errCode === 0) {
		res.status(201).json({ message: newUser.message });
	  } else {
		res.status(400).json({message: newUser.message})
	  }
	} catch (error) {
	  res.status(500).json({ error: 'Something was wrong in creating' });
	}
}

const handleDeleteUser = async (req: Request, res: Response) => {
	const userId = parseInt(req.query.id as string);
	if (isNaN(userId)) {
    	return res.status(400).json({ message: 'Invalid ticket ID' }); // Xử lý khi ID không hợp lệ
  	}	try {
	  const result = await deleteUser(userId);
	  if (result.errCode === 0) {
	  	res.status(201).json({ 
			errCode: result.errCode,
			message: result.message
		});
	  } else {
		res.status(201).json({ 
			errCode: result.errCode,			
			message: result.message
		});
	  }
	} catch (error) {
	  res.status(500).json({ error: `Something went wrong deleted ${error}`});
	}
}

const handleEditUser = async (req: Request, res: Response) => {
	const data = req.query  ;
	try {
	  const result: any = await editUser(data);
	  if (result.errCode === 0) {
		return res.status(200).json({ 
			errCode: result.errCode,
			message: result.message,
			user: result.user,
		});
	  }else {
		res.status(400).json({ 
			errCode: result.errCode,            
			message: result.message,
			user: result.user });
	  }
	  
	} catch (error) {
	  res.status(500).json({ error: `Error update user: ${error}` });
	}
}


const handleGetUserById = async (req: Request, res: Response) => {
	const userId = Number(req.query.userId);

	try {
	  if (isNaN(userId)){
		res.status(400).json({error: 'Pleate complete user id'})
	  }
	  const user = await getUserById(userId);
	  if (user.errCode === 0) {
        res.status(200).json({ 
			errCode: user.errCode,
			message: user.message,
			user: user.users });
      } else {
        res.status(404).json({ 
			errCode: user.errCode,
			message: user.message,
		    user: user.users });
      }
	} catch (error) {
	  res.status(500).json({ error: `Error went get all user ${error} `});
	}
  };

const handleGetAllUsers = async (req: Request, res: Response) => {
	try {
		const data = await getAllUsers();
		if (data.errCode === 0) {
			res.status(200).json({ 
				errCode: data.errCode,
                message: data.message,
                users: data.users
			 });
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

  const handleLoginUser = async (req: Request, res: Response) => {
	try {
	  const userEmail = req.query.email as string;
	  const userPassword = req.query.password as string
  
	  // Kiểm tra email và password có tồn tại không
	  if (!userEmail) {
		res.status(400).json({ error: 'Email are required' });
	  }

	  if (!userPassword) {
		res.status(400).json({ error: 'Password are required' });
	  }
  
	  // Gọi API đăng nhập và xử lý kết quả
	  const result= await loginAPI(userEmail, userPassword);
  
	  if (result.errCode === 0) {
		res.status(200).json({ 
			userId: result.userId,
			role: result.role,	
			errCode: result.errCode,
			message: result.message
		 });
	  } else {
		res.status(401).json({ 
			errCode: result.errCode,
			message: result.message 
		});
	  }
	} catch (error) {
	  res.status(500).json({ error: `Error went login ${error}` });
	}
  };

export default {
	handleCreateUser,
	handleDeleteUser,
	handleEditUser,
	handleGetUserById,
	handleGetAllUsers,
	handleLoginUser
}