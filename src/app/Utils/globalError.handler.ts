import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../GlobalInterface/globalError.interface";
import config from "../config";
import { ZodError } from "zod";
import zodErrorHandler from "../GlobalHandler/zodError.handler";

const globalErrorHandler = (err:any, req:Request, res:Response,next:NextFunction)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorSource : TErrorSource =[{
        path : '',
        message :"Something went wrong"
    }]

    if(err instanceof ZodError){
        const error = zodErrorHandler(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSource = error.errorSource
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        // err,
        stack : config.nodeEnv === 'development' ?  err.stack : 'Unaccessable for production ',
    })
}

export default globalErrorHandler;