import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema(
    {
 name : {
    type: String
 }


},
{ timestamps: true }
);

const subcategory = mongoose.model("subcategory", subcategorySchema);

export default subcategory;