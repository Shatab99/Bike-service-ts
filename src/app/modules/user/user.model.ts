import { model, Schema } from "mongoose";
import { TUser, User } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10)
    next()
})

userSchema.statics.isCorrectPass = async function (plain: string, hash: string) {
    return await bcrypt.compare(plain, hash)
}


userSchema.statics.isUserExists = async function (email) {
    return await userModel.findOne({ email })
}


export const userModel = model<TUser, User>("User", userSchema)