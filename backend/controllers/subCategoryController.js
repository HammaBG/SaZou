import SubCategory from "../models/subCategoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createSubCategory = asyncHandler(async (req, res) => {
  try {
    const { name, parentCategoryId } = req.body;

    if (!name || !parentCategoryId) {
      return res.status(400).json({ error: "Name and parentCategoryId are required" });
    }

    const subCategory = await SubCategory.create({ name, parentCategory: parentCategoryId });

    res.status(201).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateSubCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { subCategoryId } = req.params;

    const subCategory = await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return res.status(404).json({ error: "Sub-category not found" });
    }

    subCategory.name = name;

    const updatedSubCategory = await subCategory.save();
    res.json(updatedSubCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeSubCategory = asyncHandler(async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const removed = await SubCategory.findOneAndDelete({ _id: subCategoryId });
    
    if (!removed) {
      return res.status(404).json({ error: "Sub-category not found" });
    }

    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const listSubCategories = asyncHandler(async (req, res) => {
  try {
    const all = await SubCategory.find({}).populate('parentCategory', 'name');
    res.json(all);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const readSubCategory = asyncHandler(async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ error: "Sub-category not found" });
    }

    res.json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { createSubCategory, updateSubCategory, removeSubCategory, listSubCategories, readSubCategory };
