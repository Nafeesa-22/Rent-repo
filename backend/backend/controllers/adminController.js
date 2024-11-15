const propertySchema = require("../schemas/propertyModel");
const userSchema = require("../schemas/userModel");
const bookingSchema = require("../schemas/bookingModel");
const Admin = require('../models/admin');

require('dotenv').config();



const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    // Create new admin
    const admin = new Admin({ name, email, password });

    // Save the admin to the database
    await admin.save();
    return res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Function to login an admin
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check if the password is correct
    const isMatch = await admin.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};



/////////getting all users///////////////
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find({});
    if (!allUsers) {
      return res.status(401).send({
        success: false,
        message: "No users presents",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "All users",
        data: allUsers,
      });
    }
  } catch (error) {
    console.log("Error in get All Users Controller ", error);
  }
};

/////////handling status for owner/////////
const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
    const user = await userSchema.findByIdAndUpdate(
      userid,
      { granted: status },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: `User has been ${status}`,
    });
  } catch (error) {
    console.log("Error in get All Users Controller ", error);
  }
};

/////////getting all properties in app//////////////
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});
    if (!allProperties) {
      return res.status(401).send({
        success: false,
        message: "No properties presents",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "All properties",
        data: allProperties,
      });
    }
  } catch (error) {
    console.log("Error in get All Users Controller ", error);
  }
};

////////get all bookings////////////
const getAllBookingsController = async (req, res) => {
  try {
    const allBookings = await bookingSchema.find();
    return res.status(200).send({
      success: true,
      data: allBookings,
    });
  } catch (error) {
    console.log("Error in get All Users Controller ", error);
  }
};
module.exports = {
  getAllUsersController,
  createAdmin,
  adminLogin,
  handleStatusController,
  getAllPropertiesController,
  getAllBookingsController
};

