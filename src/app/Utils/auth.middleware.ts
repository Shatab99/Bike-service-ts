import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../GlobalInterface/userRole.interface";
import catchAsync from "./catchAsync.global";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { userModel } from "../modules/user/user.model";

const auth = (...roles: TUserRole[]) => {
    return catchAsync(async(req :Request, res:Response, next:NextFunction)=>{
        const token = req.headers.authorization;
        if(!token){
            throw new  Error("Unauthorized !!")
        }
        const decode = jwt.verify(token , config.jwtSecret as string) as JwtPayload;
        const {email,role} = decode;
        const user = await userModel.isUserExists(email)
        if(!user){
            throw new Error("User does not exists !")
        }
        if(roles && !roles.includes(role)){
            throw new Error("You have no access to this route")
        }
        
        req.user = decode 
        next()
    })
}

export default auth;