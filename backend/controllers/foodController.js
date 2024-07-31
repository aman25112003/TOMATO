import foodModel from "../models/foodModel.js";
import fs from "fs";

//1. ADDING A NEW FOOD ITEM
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added successfully!!!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Food could not be added!!!",
    });
  }
};

//2. GET ALL FOOD LIST
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Food list error",
    });
  }
};

//3. REMOVE A FOOD ITEM
const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"Food Item Removed successfully"
        })
    }

    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Food item could not be removed"
        })
    }
};

export { addFood, listFood, removeFood };
