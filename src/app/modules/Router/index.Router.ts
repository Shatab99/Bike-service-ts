import { Router } from "express";
import { userRouter } from "../user/user.router";
import { authRouter } from "../Auth/auth.route";
import { bikeRouter } from "../Bikes/bikes.route";
import { rentalRouter } from "../Rental/rental.route";

const router = Router()

const modules =[
    {
        path :'/users',
        route : userRouter
    },
    {
        path :'/auth',
        route : authRouter
    },
    {
        path :'',
        route : bikeRouter
    },
    {
        path :'',
        route : rentalRouter
    },
]


modules.forEach(route => router.use(route.path, route.route))

export default router