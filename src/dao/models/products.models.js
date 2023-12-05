import moongose from 'mongoose'

const productsSchema= new moongose.Schema({
    title: {type:String , require: true},
    descripction: {type:String , require: true},
    price: {type:Number , require: true},
    thumbnail: {type:String , require: true},
    code: {type:Number , require: true, unique:true},
    stock: {type:Number , require: true},
},{timestamps:true})

export default moongose.model('product',productsSchema)