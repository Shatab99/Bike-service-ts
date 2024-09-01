import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
};
export interface User extends Model<TUser>{
    isUserExists(email : string) : Promise<TUser>,
    isCorrectPass(plain : string, hash :string) : boolean
}


