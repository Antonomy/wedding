const Registry = require('../../models/registry')

const mongoose = require('mongoose')

const dataController = {
  // Index,
  index (req, res, next) {
    Registry.find({}, (err, foundRegistries) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.registries = foundRegistries
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Registry.findByIdAndDelete(req.params.id, (err, deletedRegistry) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.registry = deletedRegistry
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    Registry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedRegistry) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.registry = updatedRegistry
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    Registry.create(req.body, (err, createdRegistry) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.registry = createdRegistry
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Registry.findById(req.params.id, (err, foundRegistry) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a registry with that ID'
        })
      } else {
        res.locals.data.registry = foundRegistry
        next()
      }
    })
  }
}

const apiController = {
  index (req, res, next) {
    res.json(res.locals.data.registries)
  },
  show (req, res, next) {
    res.json(res.locals.data.registry)
  }
}

module.exports = { dataController, apiController }
