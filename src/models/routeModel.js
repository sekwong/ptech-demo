// src/models/routeModel.js
import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;
const routeSchema = new Schema(
  {
    _id: { type: String, default: shortid.generate },
    fromNodeId: { type: String, required: true },
    toNodeId: { type: String, required: true },
    cost: Number,
    time: Number,
    enabled: { type: Boolean, default: true },
    capacity: Number,
    startAt: Number,
    endAt: Number,
    days: [Number],
  },
  { timestamps: true },
);

const routeModel = mongoose.model('Route', routeSchema);
export default routeModel;
