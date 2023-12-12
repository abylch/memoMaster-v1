const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// define a simple schema for a user
// const userSchema = new Schema({
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     email: { type: String, required: true, unique: true }
// });


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
    // const salt = await bcrypt.genSalt();
    // password = await bcrypt.hash(password, salt);
    console.log("password: ", password);
    console.log("this password: ", this.password);
    return bcrypt.compare(password, this.password);
  };


const user = mongoose.model('user', userSchema);

module.exports = user;