import mongoose from "mongoose";

export const URI= 'mongodb+srv://cristianmele73:oYp435UEtPnyBdyU@cluster0.rnbsijr.mongodb.net/Ecommerce?retryWrites=true&w=majority'
export const init =async()=>{
    try{
        await mongoose.connect(URI)
        console.log('Database connected succesfuly')
    } catch(error){
        console.error('ah ocurrido un error  al intentar conectarse a la Database ', error.message)
    }
}