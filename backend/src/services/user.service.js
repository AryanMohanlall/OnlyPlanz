class UserService {
  constructor({ UserModel, bcryptLib, jwtLib, jwtSecret }) {
    this.User = UserModel;
    this.bcrypt = bcryptLib;
    this.jwt = jwtLib;
    this.jwtSecret = jwtSecret;
  }

  async createUser(data) {
    return await this.User.create(data);
  }

  async loginUser(email, password) {
    const user = await this.User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await this.bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = this.jwt.sign(
      { id: user._id, email: user.email },
      this.jwtSecret,
      { expiresIn: "1h" }
    );

    return { user, token };
  }

  async getUserById(id) {
    return await this.User.findById(id);
  }

  async getAllUsers() {
    return await this.User.find();
  }
}

export default UserService;
