const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const guestbookEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    posterId: { type: Schema.Types.ObjectId, ref: 'posterId' },
    rsvp: Boolean
}, {
    timestamps: true
})

const guestbookEntry = mongoose.model('guestbookEntry', guestbookEntrySchema)

module.exports = guestbookEntry