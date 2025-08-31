const mongoose = require('mongoose');
const Listing = require('../models/listings');
const initdata = require("./data");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderLust"
main().then(
    ()=>{console.log("Connected to DB")}
).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
}
initDB();