const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/simplelogin")

connect.then(() => {
    console.log("Database connected Successfully");
})
.catch((error) => {
    console.log(`Database cannot be connected, Error: ${error}`);
})


//Schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;