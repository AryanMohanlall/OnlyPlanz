const User = require('./config/UserModel');

const testSave = async()=>{
  const user = await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  })

  console.log('User created:', user);
}

module.exports = {
    testSave
}