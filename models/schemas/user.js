const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true },
    hash: String,
    name: String,
    phoneProvider: String,
    phoneNumber: String,
    preferences: [String],
    classYear: Number,
    isBusiness: Boolean,
    isAdmin: Boolean
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;