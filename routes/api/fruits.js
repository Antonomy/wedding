const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/fruits')

// add routes
// Index /api/fruits
router.get('/', dataController.index, apiController.index)
// Delete /api/fruits/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/fruits/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/fruits
router.post('/', dataController.create, apiController.show)
// Show /api/fruits/:id
router.get('/:id', dataController.show, apiController.show)


module.exports = router