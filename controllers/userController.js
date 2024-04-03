const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
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
    const {email, password} = req.body;
    if(!email || !password){ 
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    const user = await User.findOne({email});
    // compare password with the Hashed Password.
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
           { expiresIn: "15m" } 
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email Or Password is not VALID")
    }
    res.json({message: "login user"});
});

//@desc Current User Info
//@routes POST/api/users/login
//@access private

const currentUser= asyncHandler(async (req, res) => {
    res.json(req.user);
    res.json({message: "Current user information"});
});

module.exports = { registerUser, loginUser, currentUser};
