import { Router } from "express";
import MessageController from "../controllers/MessageController";
import { authMiddleware } from "../middleware";

const messageRoutes = Router();

// @ts-ignore
messageRoutes.post("/send", authMiddleware, MessageController.send);
messageRoutes.get(
  "/get/:receiverId",
  // @ts-ignore
  authMiddleware,
  (req, res) => {
    MessageController.getConversation(req, res);
  }
);

export default messageRoutes;
