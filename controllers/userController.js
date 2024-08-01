const { User } = require("../models");

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  getUser,
  deleteUser,
};
