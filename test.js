// const {
//     scryptSync,
//     createCipheriv,
//     createDecipheriv,
//   } = require('crypto');
  
// const algorithm = 'aes-192-cbc';
// const password = 'jklfsd430598430hithjg'; //password used to generate key
// const key = scryptSync(password, 'salt', 24); //key
// const iv = scryptSync("lkjdfgsg456y64j", 'salt', 16); //key // Initialization vector.
  
// function encrypt(text){
//     const cipher = createCipheriv(algorithm, key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }


// function decrypt(encryptedText){

//     const decipher = createDecipheriv(algorithm, key, iv);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
  
//   }

// const msg = "this is some text";
// const encrytpedText = encrypt(msg);
// const decryptedText = decrypt(encrytpedText);
// console.log(`original msg is ${msg}; encrypted msg is ${encrytpedText}; decrypted msg is ${decryptedText}`)


let passwords = [
    {
        name: "netflix",
        password: "klfdjgjgfd9435"
    },
    {
        name: "facebook",
        password: "klfdjgjgfd9435213"
    },
    {
        name: "mongoDB",
        password: "klfdjgjgfd94fg35"
    },
    

];

passwords = passwords.map(password =>({...password, password: "22"}));

console.log(passwords);








