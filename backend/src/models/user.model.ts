import { Schema, model } from 'mongoose';
import { I_Users } from '../interface/Props';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    }
  },
  {
    timestamps: true,
  }
);

export default model<I_Users>('User', userSchema);
