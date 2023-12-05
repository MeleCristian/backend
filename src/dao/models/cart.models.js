import moongose from 'mongoose'

const productItemSchema= new moongose.Schema({
    product:{type:moongose.Schema.Types.ObjectId, ref:"product"},
},{_id:false})

const cartsSchema= new moongose.Schema({
    products:{type:[{productItemSchema}],default:[]}
},{timestamps:true})

cartsSchema.pre('find',function (){
    this.populate('products','product')
})
export default moongose.model('cart',cartsSchema)