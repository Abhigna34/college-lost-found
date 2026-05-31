const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {

  getAllUsers,
  getAllItems,
  deleteUser,
  deleteAdminItem

} = require("../controllers/adminController");




// GET ALL USERS
router.get(
  "/users",
  protect,
  admin,
  getAllUsers
);




// GET ALL ITEMS
router.get(
  "/items",
  protect,
  admin,
  getAllItems
);




// DELETE USER
router.delete(
  "/user/:id",
  protect,
  admin,
  deleteUser
);




// DELETE ITEM
router.delete(
  "/item/:id",
  protect,
  admin,
  deleteAdminItem
);




module.exports = router;