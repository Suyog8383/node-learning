import Grocery from "../models/grocery.js";

// getAllGrocery
const getAllGrocery = async (req, res) => {
  try {
    const allGrocery = await Grocery.find({});
    if (allGrocery) {
      res.status(200).send({
        success: true,
        message: "Grocery List!",
        data: allGrocery,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Something wrong, please try again!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// getSingleGrocery
const getSingleGrocery = async (req, res) => {
  const groceryId = req.params.id;
  try {
    const singleGrocery = await Grocery.findById(groceryId);
    if (singleGrocery) {
      res.status(200).send({
        success: true,
        message: "single grocery list!",
        data: singleGrocery,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "please check enter correct id!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// addGrocery
const addGrocery = async (req, res) => {
  try {
    const newGroceryData = req.body;
    const newlyCreatedGrocery = await Grocery.create(newGroceryData);
    if (newlyCreatedGrocery) {
      res.status(201).send({
        success: true,
        message: "Grocery added successfully!",
        data: newlyCreatedGrocery,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something wrong, please try again!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
// updateGrocery
const updateGrocery = async (req, res) => {
  const groceryId = req.params.id;
  const groceryData = req.body;
  try {
    const updatedGrocery = await Grocery.findByIdAndUpdate(
      groceryId,
      groceryData,
      { new: true }
    );
    if (updatedGrocery) {
      res.status(200).send({
        success: true,
        message: "Grocery updated succesfully!",
        data: updatedGrocery,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something wrong, please try again!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// deleteGrocery
const deleteGrocery = async (req, res) => {
  const groceryId = req.params.id;
  try {
    const deletedUser = await Grocery.findByIdAndDelete(groceryId);
    if (deletedUser) {
      res.status(200).send({
        success: true,
        message: "Grocery deleted successfully!",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Something wrong, please try again!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllGrocery,
  getSingleGrocery,
  addGrocery,
  updateGrocery,
  deleteGrocery,
};
