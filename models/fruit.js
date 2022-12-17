const {Schema, model} = require('mongoose')

const fruitSchema = new Schema({
    name: String,
    readyToEat: Boolean,
    color: String
}, {
    timestamps: true
})

const Fruit = model('Fruit', fruitSchema)

module.exports = Fruit