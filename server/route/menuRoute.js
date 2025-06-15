import express from "express";
import { authenticate, authorizeRoles } from "../middleware/authmiddleware.js";
import {
  addMessMenu,
  deleteMess,
  getAllMesses,
  getMessById,
  updateMess,
} from "../controllers/messControllers.js";

const router = express.Router();

router.post(
  "/addMessAllInfo",
  authenticate,
  authorizeRoles("mess_owner"),
  addMessMenu
);
router.get(
  "/getAllMessInfo",
  authenticate,
  authorizeRoles("user", "admin"),
  getAllMesses
);
router.get("/getAllMessInfo/:id", authenticate, getMessById);
router.put(
  "/updateMessInfo/:id",
  authenticate,
  authorizeRoles("mess_owner"),
  updateMess
);
router.delete(
  "/deleteMessInfo/:id",
  authenticate,
  authorizeRoles("mess_owner"),
  deleteMess
);

export default router;
