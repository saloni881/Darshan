const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: 'Email already registered' });

  // Allow all three roles
  const allowedRoles = ['user', 'organizer', 'admin'];
  const userRole = allowedRoles.includes(role) ? role : 'user';

  const user = await User.create({ username, email, password, role: userRole });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid email or password' });

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

const getMe = async (req, res) => {
  const user = req.user;
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
};

module.exports = { register, login, getMe };