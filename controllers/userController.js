const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
//@desc Register A User
//@routes POST/api/users/register
//@access public

const registerUser= asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields Are Mandatory..!");
    }    
    const userAvailble = await User.findOne({email});
    if( userAvailble ){
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash Password using bcrypt library
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username, 
        email,
        password: hashedPassword,
    });

    console.log(`User Created ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else{
        res.status(400);
        throw new Error("User data is not valid.");
    }
    
    res.json({message: "Register The User"});
});

//@desc Login A User
//@routes POST/api/users/login
//@access public

const loginUser= asyncHandler(async (req, res) => {
    res.json({message: "Register The User"});
});

//@desc Current User Info
//@routes POST/api/users/login
//@access private

const currentUser= asyncHandler(async (req, res) => {
    res.json({message: "Current user information"});
});

module.exports = { registerUser, loginUser, currentUser};
