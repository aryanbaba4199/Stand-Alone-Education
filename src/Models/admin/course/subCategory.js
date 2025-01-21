import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // This references the Category model
    required: true,
  },
});

const Subcategory =mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
