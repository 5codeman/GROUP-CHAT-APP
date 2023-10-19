const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const PORT = 2500;
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("public"));

const sequelize = require("./util/database");

// const path = require("path");
// const fs = require("fs");

// const cors = require("cors");
// app.use(
//   cors({
//     origin: "*",
//   })
// );


//Router
const userRouter = require("./router/userRouter");
// const homePageRouter = require("./router/homePageRouter");
// const chatRouter = require("./router/chatRouter");
// const groupRouter = require("./router/groupRouter");

//Middleware
app.use("/", userRouter);
// app.use("/user", userRouter);

// app.use("/homePage", homePageRouter);

// app.use("/chat", chatRouter);

// app.use("/group", groupRouter);

// const job = require("./jobs/cron");
// job.start();

//Models
const User = require("./models/userModel");
// const Chat = require("./models/chatModel");
// const Group = require("./models/groupModel");
// const UserGroup = require("./models/userGroup");

// //Relationships between Tables
// User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });

// Chat.belongsTo(User);
// Chat.belongsTo(Group);

// User.hasMany(UserGroup);

// Group.hasMany(Chat);
// Group.hasMany(UserGroup);

// UserGroup.belongsTo(User);
// UserGroup.belongsTo(Group);

sequelize.sync() //{ force: true }
    .then((result) => {
        app.listen(PORT, function (err) {
            if (err) {
                console.log(`Error in running the server: ${err}`);
            }
            else {
                console.log(`Server is running on port: ${PORT}`);
            }
        });
    }).catch((err) => console.log(err));
