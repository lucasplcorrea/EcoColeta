const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = process.env;
console.log('JWT_SECRET:', JWT_SECRET);

const register = async (req, res) => {
  const { name, gender, cpf, address, email, password, birthdate } = req.body;

  try {
    // Verificação se o email está em formato válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Verificação se o CPF contém apenas números
    const cpfPattern = /^\d+$/;
    if (!cpfPattern.test(cpf)) {
      return res.status(400).json({ error: 'CPF must contain only numbers' });
    }

    // Verificação se o CPF tem exatamente 11 números
    if (cpf.length !== 11) {
      return res.status(400).json({ error: 'CPF must have exactly 11 digits' });
    }

    // Verificação se o email já está registrado
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Verificação se o CPF já está registrado
    const cpfExists = await User.findOne({ where: { cpf } });
    if (cpfExists) {
      return res.status(400).json({ error: 'CPF already registered' });
    }

    // Criptografia da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      gender,
      cpf,
      address,
      email,
      password: hashedPassword,
      birthdate,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token); 
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};
module.exports = { register, login };
