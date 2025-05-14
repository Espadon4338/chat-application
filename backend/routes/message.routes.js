import express from "express";

import { sendMessage, getMessages, updateMessage, deleteMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const Router = express.Router();

Router.get("/:id", protectRoute, getMessages)
Router.post("/send/:id", protectRoute, sendMessage)
Router.put("/:messageId", protectRoute, updateMessage)
Router.delete("/:messageId", protectRoute, deleteMessage)

export default Router;