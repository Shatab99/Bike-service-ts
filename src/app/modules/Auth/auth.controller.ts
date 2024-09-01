import config from "../../config"
import resSend from "../../GlobalHandler/resSend.handler"
import catchAsync from "../../Utils/catchAsync.global"
import { userModel } from "../user/user.model"
import { createToken } from "./auth.utils"

const createUser = catchAsync(async (req, res) => {
    const result = await userModel.create(req.body)
    resSend(res, 201, "User registered successfully", result)
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.isUserExists(email);

    if (!user) {
        throw new Error("User Does not exists !!")
    }

    const isPasswordCorrect = await userModel.isCorrectPass(password, user.password)

    if (!isPasswordCorrect) {
        throw new Error('Incorrect Password !!')
    }

    const token = createToken({ email: user.email, role: user.role }, config.jwtSecret as string, "10d")

    res.send({
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        token: token,
        data:user
    })
})

export const authController = {
    createUser, login
}


