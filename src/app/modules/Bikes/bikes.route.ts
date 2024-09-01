import { Router } from "express";
import { bikeController } from "./bikes.controller";
import validate from "../../Utils/validate.zod";
import { bikeValidation } from "./bikes.validation";
import auth from "../../Utils/auth.middleware";
import { UserRole } from "../../GlobalInterface/userRole.interface";

const router  = Router()
const {createBike,updateBike} = bikeValidation
 
router.post("/bikes",auth(UserRole.admin),validate(createBike), bikeController.createBike)
router.get("/bikes", bikeController.allBikes)
router.put("/bikes/:id",auth(UserRole.admin),validate(updateBike),bikeController.updateBike)
router.delete("/bikes/:id",auth(UserRole.admin), bikeController.deleteBike)


export const bikeRouter = router