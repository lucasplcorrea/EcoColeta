const bcrypt = require("bcryptjs");
const { User } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["name", "email"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
};

const updateMe = async (req, res) => {
  const { name, email, password, gender, cpf, birthDate, address } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash da senha
    if (gender) user.gender = gender;
    if (cpf) user.cpf = cpf;
    if (birthDate) user.birthDate = birthDate;
    if (address) user.address = address;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteMe = async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    console.log(`Attempting to delete user with ID: ${id}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`); // Adicionado para depuração
    console.log(`Provided password for deletion: ${password}`);

    const user = await User.findByPk(id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    if (!password) {
      console.log("No password provided");
      return res.status(400).json({ error: "Password is required" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Incorrect password" });
    }

    await user.destroy();
    console.log("User deleted successfully");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = { getAllUsers, getMe, updateMe, deleteMe, deleteUserById };
