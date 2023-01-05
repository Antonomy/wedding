const mongoose = require('mongoose')

const registrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
}, {
    timestamps: true
})

const Registry = mongoose.model('Registry', registrySchema)

module.exports = Registry