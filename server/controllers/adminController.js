const User = require("../models/User");
const Item = require("../models/Item");



// GET ALL USERS
const getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



// GET ALL ITEMS
const getAllItems = async (req, res) => {

  try {

    const items = await Item.find();

    res.status(200).json(items);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE USER
const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



// DELETE ITEM
const deleteAdminItem = async (req, res) => {

  try {

    const item = await Item.findById(req.params.id);

    if (!item) {

      return res.status(404).json({
        message: "Item not found"
      });

    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



module.exports = {

  getAllUsers,
  getAllItems,
  deleteUser,
  deleteAdminItem

};