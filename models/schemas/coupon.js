const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    name: String,
    description: String,
    isApproved: Boolean,
    url: String,
    startDate: Date,
    endDate: Date,
    tags: [String],
    views: Number,
    businessId: { type: Schema.ObjectId, ref: 'User' }
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;