import { Response } from "express";

const resSend = (res: Response, code: number, message: string,payload: {} | null) => {
    res.send({
        success: true,
        statusCode: code,
        message,
        data: payload
    })
}


export default resSend