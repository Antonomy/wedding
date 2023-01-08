const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/albums')

// add routes
// Index /api/albums
router.get('/', dataController.index, apiController.index)
// Delete /api/albums/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/albums/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/albums
router.post('/', dataController.create, apiController.show)
// Show /api/albums/:id
router.get('/:id', dataController.show, apiController.show)

module.exports = router
