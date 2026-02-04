const userModel = require('../models/user');

module.exports = {
  getAllusers: (req, res) => {
    const users = userModel.findAll();
    // In a full MVC app, this would render a view (e.g., using Pug)
    // res.render('user-list', { users }); 
    res.status(200).json(users);
  },

  getuserById: (req, res) => {
    const user = userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.status(200).json(user);
  },

  createuser: (req, res) => {
    const newuser = userModel.create(req.body);
    res.status(201).json(newuser);
  }
};
