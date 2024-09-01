import resSend from "../../GlobalHandler/resSend.handler";
import catchAsync from "../../Utils/catchAsync.global";
import { BikeModel } from "./bikes.model";

const createBike = catchAsync(async (req, res) => {
    resSend(res, 200, "Bike added successfully", await BikeModel.create(req.body))
})

const allBikes = catchAsync(async (req, res) => {
    resSend(res, 200, "Bikes retrieved successfully", await BikeModel.find())
})

const updateBike = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result = await BikeModel.findByIdAndUpdate(id, data)
    resSend(res, 200, "Bike updated successfully", result)
})

const deleteBike = catchAsync(async (req, res)=>{
    const id = req.params.id;
    const result = await BikeModel.findByIdAndUpdate(id, {isAvailable : false})
    resSend(res,200, "Bike deleted successfully", result)
})

export const bikeController = {
    createBike, allBikes, updateBike,deleteBike
}