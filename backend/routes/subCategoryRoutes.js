import express from "express";
const router = express.Router();
import {
  createSubCategory,
  updateSubCategory,
  removeSubCategory,
  listSubCategories,
  readSubCategory,
} from "../controllers/subCategoryController.js";

router.route("/").post(createSubCategory);
router.route("/:subCategoryId").put(updateSubCategory).delete(removeSubCategory);
router.route("/").get(listSubCategories);
router.route("/:subCategoryId").get(readSubCategory);

export default router;
