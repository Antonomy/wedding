const Album = require('../../models/album')

const mongoose = require('mongoose')

const dataController = {
  // Index,
  index (req, res, next) {
    Album.find({}, (err, foundAlbums) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.albums = foundAlbums
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Album.findByIdAndDelete(req.params.id, (err, deletedAlbum) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.album = deletedAlbum
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    Album.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedAlbum) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.album = updatedAlbum
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
   
    Album.create(req.body, (err, createdAlbum) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.album = createdAlbum
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Album.findById(req.params.id, (err, foundAlbum) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a album with that ID'
        })
      } else {
        res.locals.data.album = foundAlbum
        next()
      }
    })
  }
}

const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.albums)
    },
    show (req, res, next) {
      res.json(res.locals.data.album)
    }
  }

module.exports = { dataController, apiController }