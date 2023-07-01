import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    
    image: {
        type: String,
        required: true
    },
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    deliverIn: {type: Number, required: true},
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


export default mongoose.model('Orders', orderSchema);