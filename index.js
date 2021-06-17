const express = require('express');
const http =  require('http');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const encryption = require('./encryption');
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.post('/api/authenticate',async (req,res) => {
    const {password,email} = req.body;
    const {EMAIL,PASSWORD} = process.env;
    const isValid = await encryption.validatePassword(password);
    if(email !== EMAIL || !isValid){
        res.status(400).json({error:"Invalid username and password, please use auth object email and password",auth:{EMAIL,PASSWORD}});
        return;
    }
    const token = await encryption.encrypt(password);
    res.status(200).json({token});
});
app.get('/api/welcome',async (req,res) => {
    const {token} = req.headers;
    const {USERNAME,PASSWORD} = process.env;
    const decryptedPassword = await encryption.decrypt(token);
    if(decryptedPassword !== PASSWORD){
        res.status(400).json({error:"Invalid password, please use token property value",password:PASSWORD});
        return;
    }
    res.status(200).json({data:`Welcome ${USERNAME}`});
});

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT,() => console.log(`Port is running on ${process.env.PORT}`));