const mongoose  =require('mongoose')
const app = require('./app')
const dotenv = require('dotenv')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION', "Shutting down")
    console.log(err.name, err.message)
    process.exit(1)
})

dotenv.config({path: './config.env'})


 const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
 )


mongoose
.set('strictQuery', false)
.connect(DB, {
    useNewUrlParser : true
})
.then(()=> console.log('connection successful'))

const port = process.env.PORT || 3000

app.listen(port)