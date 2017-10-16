// src/models/nodeModel.js
import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;
const nodeSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    name: { type: String, required: true },
    company: String,
    type: String,
    enabled: { type: Boolean, default: true },
    routes: [{ type: String, ref: 'Route' }],
  },
  { timestamps: true },
);

const nodeModel = mongoose.model('Node', nodeSchema);
export default nodeModel;
