import User from '../models/user.model.js';

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );

        return { user, token };
    }

  async getUserById(id) {
    return await User.findById(id);
  }

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserService();
