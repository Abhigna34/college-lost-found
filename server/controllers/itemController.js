const Item = require("../models/Item");

const stringSimilarity = require(
  "string-similarity"
);


// CREATE ITEM
const createItem = async (req, res) => {

  try {

    console.log("REQ USER:", req.user);

    const {
      title,
      description,
      category,
      location,
      status
    } = req.body;





    // CREATE ITEM
    const item = await Item.create({

      title,
      description,
      category,
      location,
      status,

      image: req.file?.path,

      user: req.user.id

    });





    // OPPOSITE STATUS
    const oppositeStatus =

      status === "lost"
        ? "found"
        : "lost";





    // GET OPPOSITE ITEMS
    const oppositeItems = await Item.find({
      status: oppositeStatus
    });





    // CURRENT ITEM TEXT
    const currentText = `
      ${title}
      ${description}
      ${category}
      ${location}
    `;





    let matches = [];





    // AI MATCHING
    oppositeItems.forEach((otherItem) => {

      const otherText = `
        ${otherItem.title}
        ${otherItem.description}
        ${otherItem.category}
        ${otherItem.location}
      `;





      const similarity =
        stringSimilarity.compareTwoStrings(

          currentText.toLowerCase(),

          otherText.toLowerCase()

        );





      // IF SIMILARITY HIGH
      if (similarity > 0.3) {

        matches.push({

          item: otherItem,

          similarity:
            Math.round(similarity * 100)

        });

      }

    });





    // RESPONSE
    res.status(201).json({

      message: "Item Posted Successfully",

      item,

      possibleMatches: matches

    });





  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};





// GET ALL ITEMS
const getItems = async (req, res) => {

  try {

    const items = await Item.find().sort({
      createdAt: -1,
    });

    res.status(200).json(items);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};





// GET SINGLE ITEM
const getSingleItem = async (req, res) => {

  try {

    const item = await Item.findById(
      req.params.id
    );

    if (!item) {

      return res.status(404).json({
        message: "Item not found",
      });

    }

    res.status(200).json(item);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};





// GET MY ITEMS
const getMyItems = async (req, res) => {

  try {

    const items = await Item.find({
      user: req.user._id
    }).sort({
      createdAt: -1
    });

    res.status(200).json(items);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};





// DELETE ITEM
const deleteItem = async (req, res) => {

  try {

    const item = await Item.findById(
      req.params.id
    );

    if (!item) {

      return res.status(404).json({
        message: "Item not found",
      });

    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};





module.exports = {

  createItem,
  getItems,
  getSingleItem,
  getMyItems,
  deleteItem,

};