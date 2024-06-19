import mongoose from 'mongoose';
const mongoDbUri = process.env.MONGODB_URI;

if (!mongoDbUri) {
  throw new Error('Missing MONGO_URI');
  process.exit(1);
}

const connect = async () => await mongoose.connect(mongoDbUri);
const close = async () => await mongoose.connection.close();

export default { connect, close };