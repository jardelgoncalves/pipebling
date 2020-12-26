import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    deals_ids: {
      type: [Number],
    },
    period: {
      type: String,
    },
    totals_by_currency: {
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
    totals_converted: {
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
        ret.totals_by_currency = JSON.parse(ret.totals_by_currency);
        ret.totals_converted = JSON.parse(ret.totals_converted);

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Deals = mongoose.model('Deal', schema);
