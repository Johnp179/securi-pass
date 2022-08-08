const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const User = require("../models/User.js")
const auth = require("../authenticate.js");


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
        const waitInterval =  1*60*1000; // 1 minute

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
        res.status(500).send(e);
    }
            

})


router.post("/register", async(req, res)=>{
   
    const error = {
        userName: false,
        email: false
    };

    try{
        let user;
        user = await User.findOne({name:req.body.name})
        if(user)error.userName = true;
        user = await User.findOne({email:req.body.email});
        if(user) error.email = true;
        if(error.userName || error.email) return res.status(409).send(error);
    
        const hashPassword =  await bcrypt.hash(req.body.password, 10)
        user = new User({ ...req.body, password : hashPassword})
        user = await user.save()
        signToken(user, res)
         

    }catch(e){
        res.status(500).send(e)
    }

})


router.get("/check-for-logged-in-user", auth, (req, res)=>{
   res.send(req.user)
})


router.get("/logout",(req, res)=>{
    res.clearCookie('token',{
        httpOnly: true,
        // secure: true,
        sameSite: (process.env.NODE_ENV != "production")? "None": "Strict",
    }).end()
   
})


function signToken(user, res){
    jwt.sign({
        userName:user.name,
        email:user.email
       }, process.env.SECRET, (error, token)=>{
        if(error) return res.status(500).send(error)
        
        res
        .cookie("token",token,{
            httpOnly: true,
            // secure: true,
            sameSite: (process.env.NODE_ENV != "production") ? "None": "Strict",
        })
        .send({
            userName:user.name,
            email:user.email
        });
    })

}



module.exports = router