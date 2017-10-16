// src/models/nodeModel.js
import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;
const nodeSchema = new Schema(
  {
    id: { type: String, default: shortid.generate },
    name: { type: String, required: true },
    company: String,
    type: String,
    enable: { type: String, default: true },
    routes: [{ type: mongoose.Schema.ObjectId, ref: 'Route' }],
  },
  { timestamps: true },
);

const nodeModel = mongoose.model('Node', nodeSchema);
export default nodeModel;
