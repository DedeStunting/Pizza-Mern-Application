const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.warn('Warning: MONGO_URL is not set.');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is required');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
