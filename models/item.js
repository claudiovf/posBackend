const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)



const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3
    },
    category: {
        type: String,
        minlength: 3
    },
    price: {
        type: String
    }
})

itemSchema.set('toJSON', {
    transform: (document, returnedItem) => {
        returnedItem.id = returnedItem._id.toString()
        delete returnedItem._id
        delete returnedItem.__v
    }
})



module.exports = mongoose.model('Item', itemSchema)