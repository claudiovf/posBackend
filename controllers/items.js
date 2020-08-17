const itemsRouter = require('express').Router()
const Item = require('../models/item')



itemsRouter.get('/', (req, res) => {
    Item
        .find({})
        .then(returnedItems => {
            res.json(returnedItems)
        })     
})

itemsRouter.post('/', (req, res, next) => {
    const body = req.body
    
    if( !body.name ) {
        return res.status(400).json({ error: 'content missing' }) //return to end
    }

    const item = new Item({
        name: body.name,
        category: body.category,
        price: body.price,
    })
    
    item
        .save()
        .then(returnedItem => returnedItem.toJSON())
        .then(formatted => {
            res.json(formatted)
        })
        .catch(error => next(error))
})

module.exports = itemsRouter


