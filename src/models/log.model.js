import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    period: {
      type: String,
    },
    context: {
      type: String,
    },
    details: {
      type: String,
      get(data) {
        try {
          return JSON.parse(data);
        } catch (err) {
          return data;
        }
      },
      set(data) {
        return JSON.stringify(data);
      },
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        ret.details = JSON.parse(ret.details);

        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const Log = mongoose.model('Log', schema);
