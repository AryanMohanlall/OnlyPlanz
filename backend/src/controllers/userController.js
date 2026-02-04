const userModel = require('../models/user');

  const getAllusers = (req, res) => {
    const users = userModel.findAll();
    res.status(200).json(users);
  }

  const getuserById = (req, res) => {
    const user = userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json(user);
  }

  const createuser = (req, res) => {
    const newuser = userModel.create(req.body);
    res.status(201).json(newuser);
  }


module.exports = {
  getAllusers,
  getuserById,
  createuser
};
