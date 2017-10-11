// src/controllers/nodeController.js

import Node from '../models/nodeModel';

const populateRoutes = {
  path: 'routes',
  select: 'toNodeId cost',
};

const nodeController = {
  list: async (req, res) => {
    const nodes = await Node.find().populate(populateRoutes);
    return res.json(nodes);
  },

  show: async (req, res) => {
    const id = req.params.id;
    const node = await Node.findOne({ _id: id }).populate(populateRoutes);
    if (!node) {
      return res.status(404).json({
        message: `Node id=${id} not found`,
      });
    }
    return res.json(node);
  },

  create: async (req, res) => {
    const node = new Node(req.body);
    const savedNode = await node.save();
    if (!savedNode) {
      return res.status(500).json({
        message: 'Error saving node',
      });
    }
    return res.json(savedNode);
  },

  update: async (req, res) => {
    const id = req.params.id;
    const updated = await Node.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true },
    );
    if (!updated) {
      return res.status(500).json({
        message: 'Error updating node',
      });
    }
    return res.json(updated);
  },

  remove: async (req, res) => {
    const id = req.params.id;
    const removed = await Node.findOneAndRemove({ _id: id });
    if (!removed) {
      return res.status(500).json({
        message: 'Error removing node',
      });
    }
    return res.json(removed);
  },
};

export default nodeController;
