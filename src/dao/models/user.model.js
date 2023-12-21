import mongoose , {Schema} from "mongoose";
import paginator from "mongoose-paginate-v2"

const userSchema = new Schema({
    first_name:{type:String ,require:true},
    last_name:{type:String ,require:true},
    dni:{type:Number ,require:true},
    email:{type:String ,require:true},
    cart:{type: mongoose.Schema.Types.ObjectId, ref:'cart'},
    password:{type:String ,require:true},
    role:{type:String ,require:false, default:'user', enum:['user', 'admin']},
    status:{type:Boolean ,require:true , default:true},
},{timestamps:true})

userSchema.plugin(paginator)

export default mongoose.model('User', userSchema)