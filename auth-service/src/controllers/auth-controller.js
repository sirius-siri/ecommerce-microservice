const User = require("../models/User");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");
const {publishEvent} = require("../utils/rabbitmq");

exports.register = async(req,res) => {
    try{
        const { name,email,password} = req.body;

        const existing = await User.findOne({email});
        if(existing)
            return res.status(409).json({message:"User Already Exists"});

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashed});

        await publishEvent("USER_CREATED",{
            userId: user._id,
            email:user.email
        });

        res.status(201).json({message:"User registered"});
    } catch(err){
        res.status(500).json({message:"Server error"});
    }
};

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user)
            return res.status(404).json({message:"user not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(401).json({message:"invalid credentials"});

        const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}

        );
        res.json({token});

    } catch{
        res.status(500).json({message:"Server error"});
    }

};