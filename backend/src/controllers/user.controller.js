import  userService from '../services/user.service.instance.js'

//post
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        user.password = undefined;
        res.status(201).json(user);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: error.message });
    }
};

//post 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);

    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
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
  getAllUsers,
  loginUser
}