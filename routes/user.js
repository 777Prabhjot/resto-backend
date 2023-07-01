import express from "express";
import User from "../db/modules/User.js";
import jwt from 'jsonwebtoken';
import Bcrypt from 'bcryptjs';
const router = express.Router();

const secret = 'mysecret';

router.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({results: users});
    } catch (error) {
        console.log(error);
    }
    
})


router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            const token = jwt.sign({id: email}, secret, {expiresIn: "3d"});
            const newUser = await new User({
                email,
                password
            });
            await newUser.save();

            return res.status(201).json({
                email,
                token
            })

        }

        const hashPassword = Bcrypt.compareSync(password, user.password);

        if(hashPassword){
            const token = jwt.sign({id: user.email}, secret, {expiresIn: "3d"});
            return res.status(200).json({
                email,
                token
            })
        }

        return res.status(401).json({message: "Wrong password"});

    } catch (error) {
        console.log(error);
    }

})

export default router;