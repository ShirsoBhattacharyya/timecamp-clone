const mongoose=require('mongoose');

const Connect=()=>{
    return mongoose.connect(`${process.env.MONGODB_URL}`)
}
module.exports=Connect;