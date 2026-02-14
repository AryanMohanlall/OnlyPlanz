import { findAll, findById, create } from '../models/user.js';

  const getAllusers = (req, res) => {
    const users = findAll();
    res.status(200).json(users);
  }

  const getuserById = (req, res) => {
    const user = findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json(user);
  }

  const createuser = (req, res) => {
    const newuser = create(req.body);
    res.status(201).json(newuser);
  }


export{
  getAllusers,
  getuserById,
  createuser
};
