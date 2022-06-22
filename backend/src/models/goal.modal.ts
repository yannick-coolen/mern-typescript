import { Schema, model } from 'mongoose';
import { I_Goals } from '../interface/Props';

const goalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    }
  },
  {
    timestamps: true,
  }
);

export default model<I_Goals>('Goal', goalSchema);
