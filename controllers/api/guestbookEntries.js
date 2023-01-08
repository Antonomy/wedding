const GuestbookEntry = require('../../models/guestbookEntry')

const mongoose = require('mongoose')

const dataController = {
  // Index,
  index (req, res, next) {
    GuestbookEntry.find({}, (err, foundGuestbookEntries) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.guestbookEntries = foundGuestbookEntries
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    GuestbookEntry.findByIdAndDelete(req.params.id, (err, deletedGuestbookEntry) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.guestbookEntry = deletedGuestbookEntry
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    GuestbookEntry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedGuestbookEntry) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.guestbookEntry = updatedGuestbookEntry
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    GuestbookEntry.create(req.body, (err, createdGuestbookEntry) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.guestbookEntry = createdGuestbookEntry
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    GuestbookEntry.findById(req.params.id, (err, foundGuestbookEntry) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a guestbookEntry with that ID'
        })
      } else {
        res.locals.data.guestbookEntry = foundGuestbookEntry
        next()
      }
    })
  }
}

const apiController = {
  index (req, res, next) {
    res.json(res.locals.data.guestbookEntries)
  },
  show (req, res, next) {
    res.json(res.locals.data.guestbookEntry)
  }
}

module.exports = { dataController, apiController }
