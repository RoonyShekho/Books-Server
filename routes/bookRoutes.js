const express = require('express')
const booksController = require('./../controllers/booksController')


const router = express.Router()

router
.route('/')
.get(booksController.getAllBooks)

router
.route('/:id')
.get(booksController.getBook)
.patch(booksController.addReview)


router
.route('/genres')
.get(booksController.getBookByGenres)



module.exports = router