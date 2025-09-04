// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  birthday: String,
  bio: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isAdmin: { type: Boolean, default: false }
});

// 正确：在需要时通过 mongoose.model() 获取模型
userSchema.methods.findSimilarEmails = function() {
    // 使用 mongoose.model('User') 动态获取 User 模型
    const UserModel = mongoose.model('User');
    return UserModel.find({ email: new RegExp(this.email, 'i') });
};

// 防止模型重复编译 (在开发环境热重载时有用)
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;