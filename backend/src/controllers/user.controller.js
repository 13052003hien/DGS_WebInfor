const userService = require('../services/user.service');

exports.getAllUsers = (req, res) => {
  const users = userService.getAll();
  res.json(users);
};
