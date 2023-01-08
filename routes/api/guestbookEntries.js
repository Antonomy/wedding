const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/guestbookEntries')

// add routes
// Index /api/guestbook
router.get('/', dataController.index, apiController.index)
// Delete /api/guestbook/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/guestbook/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/guestbook
router.post('/', dataController.create, apiController.show)
// Show /api/guestbook/:id
router.get('/:id', dataController.show, apiController.show)

module.exports = router
