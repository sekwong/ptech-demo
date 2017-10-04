// src/controllers/userController.js

import userModel from '../models/userModel';

const userController = {
  list: async (req, res) => {
    const users = await userModel.find();
    return res.json(users);
  },
  show: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await userModel.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({
          message: `User id=${id} not found`,
        });
      }
      return res.json(user);
    } catch (e) {
      return res.status(500).json({
        message: 'Error getting user.',
      });
    }
  },
};

export default userController;
