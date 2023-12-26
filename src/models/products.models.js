import moongose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema= new moongose.Schema({
    title: {type:String , require: true},
    descripction: {type:String , require: true},
    price: {type:Number , require: true},
    thumbnail: {type:String , require: true},
    code: {type:Number , require: true, unique:true},
    stock: {type:Number , require: true},
    category:{type:String,require:true},
    status:{type:Boolean, require:true}
},{timestamps:true})

productsSchema.plugin(mongoosePaginate)

export default moongose.model('product',productsSchema)