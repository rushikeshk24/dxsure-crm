const express=require("express");
const router=express.Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Log=require("../models/Log");

router.post("/register",async(req,res)=>{
const {name,email,password,role}=req.body;

const hashed=await bcrypt.hash(password,10);

const user=new User({
name,email,password:hashed,role
});

await user.save();

await Log.create({
action:"User Registered",
userEmail:email
});

res.json({message:"User registered"});
});

router.post("/login",async(req,res)=>{
const {email,password}=req.body;

const user=await User.findOne({email});

if(!user)return res.status(400).json({message:"User not found"});

const match=await bcrypt.compare(password,user.password);

if(!match)return res.status(400).json({message:"Wrong password"});

await Log.create({
action:"User Logged In",
userEmail:email
});

const token=jwt.sign({id:user._id},"secret");

res.json({token,role:user.role});
});

router.get("/logs",async(req,res)=>{
const logs=await Log.find().sort({date:-1});
res.json(logs);
});

module.exports=router;