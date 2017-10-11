// src/models/routeModel.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const routeSchema = new Schema(
  {
    fromNodeId: { type: Schema.Types.ObjectId, required: true },
    toNodeId: { type: Schema.Types.ObjectId, required: true },
    cost: Number,
    time: Number,
    enable: { type: String, default: true },
    capacity: Number,
    startAt: Number,
    endAt: Number,
    days: [Number],
  },
  { timestamps: true },
);

const routeModel = mongoose.model('Route', routeSchema);
export default routeModel;
