import resSend from "../../GlobalHandler/resSend.handler";
import catchAsync from "../../Utils/catchAsync.global";
import { userModel } from "./user.model";

const getAllUser = catchAsync(async (req, res) => {
    resSend(res, 200, "User profile retrieved successfully", await userModel.find())
})

const getMe  = catchAsync(async (req, res)=>{
    const {email} = req.user
    const result = await userModel.findOne({email})
    resSend(res, 200,"User profile retrieved successfully", result)
})

const updateMe = catchAsync(async (req, res)=>{
    const {email}= req.user;
    const data = req.body
    const result = await userModel.findOneAndUpdate({email},data)
    resSend(res,200,"Profile updated successfully",result)
})



export const userController = {
    getAllUser, getMe,updateMe
}