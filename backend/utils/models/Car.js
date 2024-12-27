import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.models.Car || mongoose.model("Car", carSchema);
