const express = require("express");
const router = express.Router();

const chatController = require("../controller/chatController");

// const userAuthentication = require("../middleware/auth");

router.post("/sendMessage", chatController.sendMessage); //userAuthentication,
// // router.get("/getMessages", chatController.getMessages);

module.exports = router;