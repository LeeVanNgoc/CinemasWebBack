import { Request, Response } from 'express';
import {createUser, deleteUser, editUser, getAllUsersById, loginAPI} from '../services/userService';


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
	const data = req.body  ;
	try {
	  const result: any = await editUser(data);
	  if (result.error) {
		return res.status(404).json({ error: result.error });
	  }
	  res.status(200).json({ message: result.message, user: result.user });
	} catch (error) {
	  console.error('Error handling edit user request:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
}


const handleGetAllUsersById = async (req: Request, res: Response) => {
	try {
	  const userId = req.query.id as string | number;
	  const data = await getAllUsersById(userId);
	  res.status(200).json({ data });
	} catch (error) {
	  console.error('Error:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };

  const handleLoginUser = async (req: Request, res: Response) => {
	try {
	  const userEmail = req.body.email as string;
	  const userPassword = req.body.password as string;
  
	  // Kiểm tra email và password có tồn tại không
	  if (!userEmail || !userPassword) {
		return res.status(400).json({ error: 'Email and password are required' });
	  }
  
	  // Gọi API đăng nhập và xử lý kết quả
	  const result: any = await loginAPI(userEmail, userPassword);
  
	  if (result.success) {
		res.status(200).json({ success: true, user: result.user });
	  } else {
		res.status(401).json({ success: false, message: result.message });
	  }
	} catch (error) {
	  console.error('Error:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };

export default {
	handleCreateUser,
	handleDeleteUser,
	handleEditUser,
	handleGetAllUsersById,
	handleLoginUser
}