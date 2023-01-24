const express = require('express')
const appError= require('./utils/appError')
const errorHandler = require('./controllers/errorController')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())

app.use('/api/v1/books', bookRoutes)
app.use('/api/v1/users', userRoutes)


 app.all('*', (req, res, next) => {
     next(new appError(`Can't find ${req.originalUrl}`,404))
 })


app.use(errorHandler)



module.exports = app

