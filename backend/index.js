const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ashishjat126:mpAoI61CKE6DX8Hq@cluster0.mw2kw28.mongodb.net/intersala?retryWrites=true&w=majority&appName=Cluster0');

const UserSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  gender: String,
  address: String,
  email: { type: String, unique: true },
  contactNumber: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
  const { name, dob, gender, address, email, contactNumber, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, dob, gender, address, email, contactNumber, password: hashedPassword });
    await user.save();
    res.status(201).send("User Registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).send("Invalid Credentials");
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'secretKey');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

app.get('/candidate-details', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
