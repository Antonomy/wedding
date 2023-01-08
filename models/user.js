const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const SALT_ROUNDS = 6

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 4,
    required: true
  },
  albumsAsPhotographer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'albumsAsPhotographer' }],
  albumsAsClient: [{ type: mongoose.Schema.Types.ObjectId, ref: 'albumsAsClient' }]

}, {
  timestamps: true,
  toJSON: {
    transform (doc, ret) {
      delete ret.password
      return ret
    }
  }
})

userSchema.pre('save', async function (next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next()
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  return next()
})

module.exports = model('User', userSchema)
