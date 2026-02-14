import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import dns from 'node:dns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ 
  path: path.resolve(__dirname, '../prod.env'), 
  quiet: true 
});

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);

    const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@onlyplanz.jxed6sl.mongodb.net/?appName=OnlyPlanz`, {

    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Connection error:', error.message);
    process.exit(1);
  }
};



export{
  connectDB
};
