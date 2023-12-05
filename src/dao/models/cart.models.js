import moongose from 'mongoose'

const productItemSchema= new moongose.Schema({
    id: {type:String, require:true},
    quantity:{type:Number, require:true}
},{_id:false})

const cartsSchema= new moongose.Schema({
    products:{type:[productItemSchema],default:[]}
},{timestamps:true})

export default moongose.model('cart',cartsSchema)