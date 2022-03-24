import {Router} from "express"
import { User } from '../database/models';
import express from 'express';

const app = express();
const cookesParser = require ("cookie-parser")
const { createTokens, validateToken } = require ("../middleware/auth")
const bcrypt = require('bcrypt')
const router = Router();
app.use (cookesParser());

//-------api to register a user
router.post("/signup", async (req, res) =>{
    const {usename, useremail, userpassword } = req.body;
    const user = await User.findOne({ where: {usename: usename}});
    // const user2 = await User.findOne({ where: {useremail:useremail}});
    // if (user2) res.status(400).json({ error: "User already exist"});
    bcrypt.hash(userpassword,10).then((hash) =>{
        User.create({
            usename:usename,
            useremail: useremail,
            userpassword: hash,
        }).then (()=> {
            res.json("user registered successfully");
        }).catch((err)=>{
             if (err){
                 res.status(400).json({error:err});
             }
        });
    });

});

//----api to login the user
router.post('/signin', async (req, res)=>{
    const {usename, userpassword} = req.body;
    const user = await User.findOne({ where: {usename: usename}});
    if (!user) {
        errors.useremail = "User not found";
        res.status(404).json({ errors });
    
        return;
    }

    const password = user.userpassword;
    bcrypt.compare(userpassword, password).then((match) => {
   if (!match){
       res.status(400).json({error: "wrong password"});
   }else{

    const accessToken = createTokens(user)
    res.cookie ("access-token", accessToken, {
        maxAge: 60*24*30*1000,
    })
       res.json ("user logged in")
   }
    })
})
export default router;