const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listings');
const path=require("path");
const app = express();
const MONGO_URL="mongodb://127.0.0.1:27017/wanderLust";
main().then(
    ()=>{console.log("Connected to DB")}
).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("Hi this is my project")
})
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/show.ejs",{listings});
})
app.post("/listings",async (req,res)=>{
    let listings = req.body.Listing;
    const newListing = new Listing(listings);
    await newListing.save();
    res.redirect("/listings");
})
// app.get("/testing", async (req,res)=>{
//     let samplelisting = new Listing({
//         title : "My new villa",
//         description:"by the beach",
//         price:1500,
//         location:"Hyderabad",
//         country:"India"
//     })
//     await samplelisting.save();
//     console.log("Data saved");
//     res.send("successfully testing");
// })
app.listen(8080,()=>{
    console.log("server listening at port 8080");
})