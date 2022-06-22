import mongoose from 'mongoose';
import colors from 'colors';

/**
 * Connects with database MongoDB and returns a message whether the connection has been succeeded or not
 * @try Try to run the function until it catches an error.
 * @catch The very first error that has been found while the function is running will trigger a message
 */
export default async function connectDB() {
  try {
    const uri = await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log(
      colors.bold.cyan.underline(`Connected to MongoDB: ${uri.connection.host}`)
    );
  } catch (error) {
    console.log(error);
  }
}
