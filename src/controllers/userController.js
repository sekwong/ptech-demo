// src/controllers/userController.js

import User from '../models/userModel';

const userController = {
  list: async (req, res) => {
    const users = await User.find();
    return res.json(users);
  },

  show: async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        message: `User id=${id} not found`,
      });
    }
    return res.json(user);
  },

  create: async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(500).json({
        message: 'Error saving user',
      });
    }
    return res.json(savedUser);
  },

  update: async (req, res) => {
    const id = req.params.id;
    const updated = await User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    if (!updated) {
      return res.status(500).json({
        message: 'Error updating user',
      });
    }
    return res.json(updated);
  },

  remove: async (req, res) => {
    const id = req.params.id;
    const removed = await User.findOneAndRemove({ _id: id });
    if (!removed) {
      return res.status(500).json({
        message: 'Error removing user',
      });
    }
    return res.json(removed);
  },
};

export default userController;
