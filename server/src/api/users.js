const { Router } = require('express');
const { User, validate } = require('../models/User');

const router = Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(401).json({ message: 'User with given email/username already exists.' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).json({ message: 'User Created SUccessfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post('/currentUser', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    if (!user) return res.status(420).json({ message: 'User doesnot exist.' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
