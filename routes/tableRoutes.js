const express = require('express')
const router = express.Router()
const tableController = require('../controllers/tableController')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.post('/', tableController.createTable)

router.get('/', tableController.getAllTables)

router.get('/:id', tableController.getTableById)

router.put('/:id', tableController.updateTable)

router.delete('/:id', tableController.deactivateTable)

module.exports = router 