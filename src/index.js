const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existinguser = await collection.findOne({name: data.name});
    if(existinguser){
        res.send("User already exists, please choose another username");
    }
    else{
        //hash password using bcryt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

    
}); 

//Login user
app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name not found!");
        }
        //comparing the hashed password from database
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            req.send("Incorrect Password!");
        }
    }
    catch{
        res.send("wrong user details!");
    }
});




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})
