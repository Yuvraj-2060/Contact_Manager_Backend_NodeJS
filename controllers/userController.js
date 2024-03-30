const asyncHandler = require('express-async-handler')
//@desc Register A User
//@routes POST/api/users/register
//@access public

const registerUser= asyncHandler(async (req, res) => {
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
