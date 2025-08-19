const jwt = require('jsonwebtoken');
const UserModel = require("../models/user")    // import user model

const checkAuth = async (req,res,next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) return res.status(401).json({ message: "Unauthorized"});


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        const user = await UserModel.findById(decoded.ID);
        if (!user) return res.status(401).json({ message: "User not found"});

        req.user = user;    // full user now available including email
        console.log(req.user)
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Invalid token "})
    }
}

module.exports = checkAuth