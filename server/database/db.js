import mongoose from 'mongoose';

export const Connection=async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-nula82n-shard-00-00.pr4encz.mongodb.net:27017,ac-nula82n-shard-00-01.pr4encz.mongodb.net:27017,ac-nula82n-shard-00-02.pr4encz.mongodb.net:27017/FLIPKARTDB?ssl=true&replicaSet=atlas-b4it63-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
       console.log("Database connected successfully");
    }
    catch(error){
        console.log('Error while connecting with the database',error.message);
    }
}
export default Connection;