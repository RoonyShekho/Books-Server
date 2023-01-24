const mongoose  =require('mongoose')

const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    pages:Number,
    imageUrl:String,
    rating:Number,
    description:String,
    downloadLink:String,
    genres:[String],
    reviews:[String]
})

const Books = mongoose.model('Book', bookSchema)


module.exports = Books