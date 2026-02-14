import { User } from './config/UserModel.js';
import { connectDB } from './config/db.js';

const testSave = async()=>{
  await connectDB();
  const user = await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  })

  console.log('User created:', user);
}

export{
    testSave
}