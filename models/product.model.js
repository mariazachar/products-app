const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let productSchema = new Schema ({
    product: {
        type: String,
        require: [true]
    },
    cost: {
        type: Number,
        require: [ true ]
    },
    description: { type: String }, 
    quantity: { type: Number, require: [true] }
    
},
{
    collection: 'products',
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema);