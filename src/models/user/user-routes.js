import { Router } from "express";
import { userController } from "../../controllers/user-controller.js";

const router = Router();

router.post("/users", userController.addUser);
router.get('/users/auth', userController.authUser)

export { router as userRouter };
