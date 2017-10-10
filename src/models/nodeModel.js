// src/models/nodeModel.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const nodeSchema = new Schema(
  {
    name: { type: String, required: true },
    company: String,
    type: String,
    enable: { type: String, default: true },
  },
  { timestamps: true },
);

const nodeModel = mongoose.model('Node', nodeSchema);
export default nodeModel;
