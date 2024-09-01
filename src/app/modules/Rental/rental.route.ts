import { Router } from "express";
import { rentalController } from "./rental.controller";
import validate from "../../Utils/validate.zod";
import { rentalValidation } from "./rental.validation";
import auth from "../../Utils/auth.middleware";
import { UserRole } from "../../GlobalInterface/userRole.interface";

const router = Router()
const { createRental } = rentalValidation

router.get("/rentals", auth(UserRole.admin, UserRole.user), rentalController.getMyRents)
router.post("/rentals", auth(UserRole.admin, UserRole.user), validate(createRental), rentalController.createRental)
router.put("/rentals/:id/return", auth(UserRole.admin), rentalController.stopRental)


export const rentalRouter = router