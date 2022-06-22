import { Document } from 'mongoose';

export interface I_Goals extends Document {
  goal: string;
}

export interface I_Users extends Document {
  name: string;
  email: string;
  password: string;
}
