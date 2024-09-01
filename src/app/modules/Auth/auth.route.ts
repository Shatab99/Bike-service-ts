import { Router } from "express"
import validate from "../../Utils/validate.zod"
import { authController } from "./auth.controller"
import { userValidation } from "../user/user.validation"
import { authValidation } from "./auth.validation"

const router = Router()

const {createValidation}= userValidation
const {login}= authValidation

router.post("/signup",validate(createValidation), authController.createUser)
router.post("/login",validate(login), authController.login)


export const authRouter = router