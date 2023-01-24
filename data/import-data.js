const fs = require('fs')
const mongoose  =require('mongoose')
const dotenv = require('dotenv')
const Books = require('./../models/booksModel')  


dotenv.config({path: './../config.env'})
 

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)


mongoose.set('strictQuery', false);

const connect = async()=>{
await mongoose.connect(DB, {
    useNewUrlParser : true
})
.then(()=> console.log('connection successful'))
}

const books = JSON.parse(fs.readFileSync('./books.json', 'utf-8'))

const importData = async()=>{
    try{
        connect()
        await Books.create(books)
        console.log('data loaded')
    }catch(err){
        console.log(err)
    }
}


const deleteData = async()=>{
    try{
        connect()
        await Books.deleteMany()
        console.log('all deleted')
    }catch(err){
        console.log(err)
    }
}

//deleteData()

importData()


