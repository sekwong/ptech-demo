// src/controllers/routeController.js

import Route from '../models/routeModel';

const routeController = {
  list: async (req, res) => {
    const routes = await Route.find();
    return res.json(routes);
  },

  show: async (req, res) => {
    const id = req.params.id;
    const route = await Route.findOne({ _id: id });
    if (!route) {
      return res.status(404).json({
        message: `Route id=${id} not found`,
      });
    }
    return res.json(route);
  },

  create: async (req, res) => {
    const route = new Route(req.body);
    const savedRoute = await route.save();
    if (!savedRoute) {
      return res.status(500).json({
        message: 'Error saving route',
      });
    }
    return res.json(savedRoute);
  },

  update: async (req, res) => {
    const id = req.params.id;
    const updated = await Route.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    if (!updated) {
      return res.status(500).json({
        message: 'Error updating route',
      });
    }
    return res.json(updated);
  },

  remove: async (req, res) => {
    const id = req.params.id;
    const removed = await Route.findOneAndRemove({ _id: id });
    if (!removed) {
      return res.status(500).json({
        message: 'Error removing route',
      });
    }
    return res.json(removed);
  },
};

export default routeController;
