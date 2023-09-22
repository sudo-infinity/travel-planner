const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' },
  );
  return token;
};

// userSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }
//   next();
// });

// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label('User Name'),
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

const User = model('User', userSchema);

module.exports = { User, validate };
