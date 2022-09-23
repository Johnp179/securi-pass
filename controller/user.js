const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const User = require("../models/User.js")
const auth = require("../authenticate.js");


router.get("/get-all", async(req, res) => {

    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).end();
        console.error(e);

    }

});

router.delete("/delete-all", async(req, res) => {

    try{
        const deletedCount = await User.deleteMany({});
        res.send(deletedCount);
    }catch(e){
        res.status(500).end();
        console.error(e);
    }

});

router.delete("/delete/:id", async(req, res) => {

    try{
        const doc = await User.findOneAndDelete({_id:req.params.id});
        doc ? res.status(200).send(doc) : res.status(404).end();

    }catch(e){
        res.status(500).end();
        console.error(e);
    }


});


const waitInterval =  60*60*1000; // 1hour
router.post("/login",async(req, res)=>{
    const error = {
        email: false,
        password: false,
        attempts: false
    };

    try{
        const user = await User.findOne({email : req.body.email});

        if(!user){
            error.email = true;
            return res.status(401).send(error);
        }

        if(Date.now() - user.startTime > waitInterval){
            user.loginAttempts = 0;
            user.startTime = Date.now();
            await user.save();
        }
    
        if(user.loginAttempts >= 5){
            error.attempts = true;
            return res.status(401).send(error);
        }
    
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match) return signToken(user, res);
        
        user.loginAttempts += 1;
        await user.save();
        error.password = true;
        res.status(401).send(error);



    }catch(e){
        res.status(500).end();
        console.error(e);
    }
            

})


router.post("/register", async(req, res)=>{
    const error = {
        username: false,
        email: false
    };

    try{
        let user;
        req.body.username = req.body.username.trim(); // remove whitespace
        user = await User.findOne({username:req.body.username});
        if(user)error.username = true;
        user = await User.findOne({email:req.body.email});
        if(user) error.email = true;
        if(error.username || error.email) return res.status(409).send(error);
    
        const hashPassword =  await bcrypt.hash(req.body.password, 10)
        user = new User({ ...req.body, password : hashPassword})
        user = await user.save()
        signToken(user, res)
         

    }catch(e){
        res.status(500).end();
        console.error(e);
    }

})


router.get("/check-for-logged-in-user", auth, (req, res)=>{
    res.send(req.user)
    
})


router.get("/logout",(req, res)=>{
    res.clearCookie('token',{
        httpOnly: true,
        secure: process.env.NODE_ENV !== "production"? false: true,
        sameSite: "Strict"
    }).end()
   
})


function signToken(user, res){
    jwt.sign({
        username:user.username,
        email:user.email,
        userID:user._id
       }, process.env.SECRET, (error, token)=>{
        if(error) return res.status(500).send(error)
        
        res
        .cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== "production"? false: true,
            sameSite:"Strict",
          
     
        })
        .send({
            username:user.username,
            email:user.email,
            userID:user._id

        });
    })

}



module.exports = router