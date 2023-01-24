const sendErrorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

const sendErrorForProduc = (err, res) => {

    if(err.isOperational){
            
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })
    }else{

        console.error('Error:', err)

        res.status(500).json({
            status:'error',
            message:'Something went wrong'
        })
    }
}



module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === "development"){
        sendErrorForDev(err, res)


    }else if(process.env.NODE_ENV === "production"){
        sendErrorForProduc(err, res)
    }

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}