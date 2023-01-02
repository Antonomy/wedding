const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photographer: { type: String, required: true },
    client: { type: String, required: true },
    photos: String,
    released: Boolean
}, {
    timestamps: true
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album