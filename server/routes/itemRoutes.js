const express = require("express");

const router = express.Router();

const {
  createItem,
  getItems,
  getSingleItem,
  getMyItems,
  deleteItem,
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");

const upload = require("../config/multer");



// CREATE ITEM
router.post(
  "/",
  protect,
  upload.single("image"),
  createItem
);



// GET MY ITEMS
router.get("/my-items", protect, getMyItems);



// GET ALL ITEMS
router.get("/", getItems);



// GET SINGLE ITEM
router.get("/:id", getSingleItem);



// DELETE ITEM
router.delete("/:id", deleteItem);



module.exports = router;