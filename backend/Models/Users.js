// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: String,
});

module.exports = mongoose.model('User', userSchema);
