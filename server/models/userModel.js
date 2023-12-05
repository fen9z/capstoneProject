const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // Additional Fields
  address: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  address,
  postalCode
) {
  // validation
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !address ||
    !postalCode
  ) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('The email is no valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('password is not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }
  // hash password used static method cryptPassword
  const hash = await this.cryptPassword(password);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    address,
    postalCode,
  });
  console.log('Created user:', user);
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  // got user by email
  const user = await this.findOne({ email });

  // check user
  if (!user) {
    throw Error('incorrect email');
  }

  // compare password to database
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

// static method to crypt password
userSchema.statics.cryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = mongoose.model('User', userSchema);
