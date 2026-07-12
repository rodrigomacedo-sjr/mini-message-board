import express from "express";
import messageController from "../controller/message.js";

const router = express.Router();

router.get("/", messageController.getAll);

router.get("/create", messageController.createForm);

router.post("/create", messageController.create);

router.get("/:id", messageController.getById);

router.delete("/:id", messageController.deleteById);

export default router;
