const APIFeatures = require('./../utils/api-features')
const catchAsync = require('./../utils/catchAsync')
const Books = require('../models/booksModel')
const AppError  =require('./../utils/appError')




exports.getAllBooks = catchAsync(async (req, res, next) => {
    const queryObj = {...req.query} 
    const exludeFields = ['page', 'sort', 'limit']
    exludeFields.forEach(el=> delete queryObj[el])


        const features = new APIFeatures(Books.find(), req.query)
        .sort()
        .paginate()
        .filter()
    
    
        const books = await features.query

    
        res.status(200).json({
            books
    })
})



exports.addReview = catchAsync(async(req, res, next) => {
        const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators:true
        })

        
        if(!book){
            return next(new AppError('No book found', 404))
        }

        res.status(200).json({
            book:book
        })

})

exports.getBook = catchAsync(async (req, res, next) => {
        const book = await Books.findById(req.params.id)


        if(!book){
            return next(new AppError('No book found', 404))
        }

        res.status(200).json({
            book:book
        })
   
})




exports.getBookByGenres = catchAsync(async(req, res, next) => {
    
    const book = await Books.findById(req.params.genre)
    res.status(200).json({        
        status:'success',
        book:book
    })
})












