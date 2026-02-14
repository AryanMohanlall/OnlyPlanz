import  userService from '../services/user.service.js'

//post
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get
const getAllUsers = async(req, res)=>{
    try{
        const users = await userService.getAllUsers();
        return res.status(200).json(users);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


export {
  createUser,
  getUserById,
  getAllUsers
}