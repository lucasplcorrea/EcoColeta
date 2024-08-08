const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = process.env;

console.log('JWT_SECRET:', JWT_SECRET);

const register = async (req, res) => {
  const { name, gender, cpf, address, email, password, birthdate } = req.body;

  try {
    // Verificação do email e CPF
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const cpfPattern = /^\d+$/;
    if (!cpfPattern.test(cpf) || cpf.length !== 11) {
      return res.status(400).json({ error: 'Invalid CPF' });
    }

    // Verificar existência do usuário
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const cpfExists = await User.findOne({ where: { cpf } });
    if (cpfExists) {
      return res.status(400).json({ error: 'CPF already registered' });
    }

    // Criar usuário
    const user = await User.create({
      name,
      gender,
      cpf,
      address,
      email,
      password,  // A senha será hasheada pelo hook do modelo
      birthdate,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Register error:', error);
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

    console.log('Password provided for login:', password);
    console.log('Hashed password from database:', user.password);

    // Comparar senha fornecida com o hash armazenado
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };
