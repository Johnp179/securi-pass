const express = require("express")
const router = express.Router()
const Account = require("../models/Account.js")
const auth = require("../authenticate.js");
const {
    scryptSync,
    createCipheriv,
    createDecipheriv,
  } = require('crypto');
const algorithm = 'aes-192-cbc';
const key = scryptSync(process.env.password, 'salt', 24); //key
const iv = scryptSync("lkfgdgjdfgsg456y64j", 'salt', 16); // Initialization vector.


router.get("/get-all", async(req, res)=>{
    let accounts = await Account.find({});
    accounts = accounts.map(account=>{
        const decipher = createDecipheriv(algorithm, key, iv);
        let decryptedPassword = decipher.update(account.password, 'hex', 'utf8');
        decryptedPassword += decipher.final('utf8');
        return {
            ...account.toObject(),
            password: decryptedPassword
        };
    })  

    res.send(accounts);
  
})


router.post("/add", async(req, res)=>{
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedPassword = cipher.update(req.body.password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    const account = new Account({name:req.body.name, password: encryptedPassword});
    try{
        await account.save();
        res.status(201).end();
    }catch(e){
        res.status(500).send(e);
    }
   
})


router.put("/update/:id", async(req, res)=>{
    const cipher = createCipheriv(algorithm, key, iv);
    let encryptedPassword = cipher.update(req.body.password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    const updatedAccount = {...req.body, 
        password:encryptedPassword
    };

    try{
        const doc =  await Account.findOneAndUpdate({_id: req.params.id}, updatedAccount);
        doc ? res.status(200).send(doc) : res.status(404).end();

    }catch(e){
        res.status(500).send(e);
    }
  })
  
  
  router.delete("/delete/:id", async(req, res)=>{
    try{
        const doc = await Account.findOneAndDelete({_id:req.params.id});
        doc ? res.status(200).send(doc) : res.status(404).end();

    }catch(e){
        res.status(500).send(e);
    }
  })
  


module.exports = router




