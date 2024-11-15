const express = require("express");
const { createAdmin, adminLogin } = require('../controllers/adminController');
const authMiddlware = require("../middlewares/authMiddlware");
console.log('createAdmin:', createAdmin);  // Log the imported function
console.log('adminLogin:', adminLogin);  // Log the imported function
const { getAllUsersController, handleStatusController, getAllPropertiesController, getAllBookingsController } = require("../controllers/adminController");

const router = express.Router()

router.get('/getallusers', authMiddlware, getAllUsersController)

router.post('/handlestatus', authMiddlware, handleStatusController)

router.get('/getallproperties', authMiddlware, getAllPropertiesController)

router.get('/getallbookings', authMiddlware, getAllBookingsController)

router.post('/create', createAdmin);

// Route for admin login
router.post('/login', adminLogin);


module.exports = router