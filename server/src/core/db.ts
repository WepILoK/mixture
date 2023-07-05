import mongoose from 'mongoose';

mongoose.Promise = Promise;


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://WepJIoK:123456789w@cluster0.nkfzlbg.mongodb.net/mixture?retryWrites=true&w=majority")

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

export {db, mongoose}