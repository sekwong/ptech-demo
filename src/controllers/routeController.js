// src/controllers/routeController.js

import Route from '../models/routeModel';
import Node from '../models/nodeModel';

import PathFinder from '../lib/pathfinder';

const routeController = {
  getPath: async (req, res) => {
    const routes = await Route.find();
    const { fromNodeId, toNodeId } = req.params;

    const pathFinder = new PathFinder(routes);
    const path = pathFinder.findAll(fromNodeId, toNodeId);

    return res.json(path);
  },
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
    const node = await Node.findOne({ _id: route.fromNodeId });
    if (node) {
      node.routes.push(savedRoute);
      await node.save();
    }
    return res.json(savedRoute);
  },

  update: async (req, res) => {
    const id = req.params.id;
    if (req.body.fromNodeId) {
      return res.status(500).json({
        message: 'Can not update read-only fromNodeId field',
      });
    }
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
    const node = await Node.findOne({ routes: id });
    const index = node.routes.indexOf(id);
    node.routes.splice(index, 1);
    await node.save();
    return res.json(removed);
  },
};

export default routeController;
