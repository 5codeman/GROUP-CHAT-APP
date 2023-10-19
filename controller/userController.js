const path = require("path");
const { Op } = require("sequelize"); // only the Op object of sequlize is required
const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const sequelize = require("../util/database");
// const Sib = require("sib-api-v3-sdk");


// function generateAccessToken(id, email) {
//     return jwt.sign({ userId: id, email: email }, process.env.TOKEN);
// }

const getLoginPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/views/login.html'));
    } catch (error) {
        console.log(error);
    }
};

const postUserSignUp = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const password = req.body.password;

        const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { number }] } });

        if (existingUser) {
            res.status(409).send(`<script>alert('This email or number already exists. Please choose another one'); window.location.href='/'</script>`);
        }
        else {
            await User.create({
                name: name,
                email: email,
                number: number,
                password: password,
            });
            res.status(200).send(`<script>alert('User Created Successfully!'); window.location.href='/'</script>`);
        }
    } catch (error) {
        console.log(error);
    }
};

// const postUserLogin = async (req, res, next) => {
//     try {
//         const email = req.body.loginEmail;
//         const password = req.body.loginPassword;

//         await User.findOne({ where: { email: email } }).then((user) => {
//             if (user) {
//                 bcrypt.compare(password, user.password, (err, result) => {
//                     if (err) {
//                         return res
//                             .status(500)
//                             .json({ success: false, message: "Something went Wrong!" });
//                     }
//                     if (result == true) {
//                         return res.status(200).json({
//                             success: true,
//                             message: "Login Successful!",
//                             token: generateAccessToken(user.id, user.email),
//                         });
//                     } else {
//                         return res.status(401).json({
//                             success: false,
//                             message: "Password Incorrect!",
//                         });
//                     }
//                 });
//             } else {
//                 return res.status(404).json({
//                     success: false,
//                     message: "User doesn't Exists!",
//                 });
//             }
//         });
//     } catch (error) {
//         // console.log(error);
//         console.log("pakda gaya");
//     }
// };

module.exports = {
    getLoginPage,
    postUserSignUp,
    // postUserLogin,
};