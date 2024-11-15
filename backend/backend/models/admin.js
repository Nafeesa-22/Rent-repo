const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin schema definition
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superuser'], default: 'admin' },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Hash the password before saving it to the database
adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to check if the password matches the hashed password
adminSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
