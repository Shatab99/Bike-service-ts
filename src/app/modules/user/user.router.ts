import { Router } from "express";
import { userController } from "./user.controller";
import { UserRole } from "../../GlobalInterface/userRole.interface";
import auth from "../../Utils/auth.middleware";
import { userValidation } from "./user.validation";
import validate from "../../Utils/validate.zod";

const router = Router()
const { updateValidation } = userValidation

router.get("/all-users", userController.getAllUser)
router.get("/me", auth(UserRole.user, UserRole.admin), userController.getMe)
router.put("/me", auth(UserRole.user, UserRole.admin), validate(updateValidation), userController.updateMe)

export const userRouter = router