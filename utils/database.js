import mongoose from 'mongoose';

let isConnected = false;

export const connectToDbB = async () =>{

    // if(isConnected){
    //     console.log('====================================');
    //     console.log("Mongodb is already connnected...");
    //     console.log('====================================');
    //     return;
    // }

    try{
    mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // isConnected = true;

        console.log("MongoDB connected...")
    }catch(err){
        console.log('====================================');
        console.log("MongoDB connection err: "+err);
        console.log('====================================');
    }

}