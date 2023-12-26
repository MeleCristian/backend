import moongose from 'mongoose'

const productItemSchema= new moongose.Schema({
    product:{type:moongose.Schema.Types.ObjectId, ref:"product"},
    quantity:{type:Number,default:1,require:true}
},{_id:false})

const cartsSchema= new moongose.Schema({
    productsList:{type:[productItemSchema],default:[]}
},{timestamps:true})

cartsSchema.pre('find',function (){
    this.populate('productsList','product')
})
export default moongose.model('cart',cartsSchema)