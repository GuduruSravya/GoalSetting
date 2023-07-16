const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//@desc Register User
//@route POST /api/users
//@access Public
const register = asyncHandler(async (req,res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    //checking if user is alredy registered
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        password:hashPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWT(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
    
})

//@desc Authenticate User
//@route POST /api/users/login
//@access Public
const login = asyncHandler(async (req,res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error("User info does not exists")
    }

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWT(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

//@desc Get User
//@route GET /api/users/me
//@access Public
const getUser = asyncHandler(async (req,res) =>{
    res.json({message:'Get user'})
})

//Generate JWT
const generateJWT = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports ={
    register,
    login,
    getUser
}