const mongoose = require('mongoose')

const guestbookEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    rsvp: Boolean
}, {
    timestamps: true
})

const guestbookEntry = mongoose.model('guestbookEntry', guestbookEntrySchema)

module.exports = guestbookEntry