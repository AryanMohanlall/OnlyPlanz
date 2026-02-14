import User from '../models/user.model.js';

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserService();
