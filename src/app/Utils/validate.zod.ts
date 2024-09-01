import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

const validate = (schema: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parse({
                body: req.body
            })
            next();
        } catch (err) {
            next(err)
        }
    }
}

export default validate