import resSend from "../../GlobalHandler/resSend.handler";
import catchAsync from "../../Utils/catchAsync.global";
import { TBike } from "../Bikes/bikes.interface";
import { BikeModel } from "../Bikes/bikes.model";
import { userModel } from "../user/user.model";
import { TRental } from "./rental.interface";
import { RentalModel } from "./rental.model";

const createRental = catchAsync(async (req, res) => {
    const time = new Date()
    const { email } = req.user;
    const user = await userModel.findOne({ email })

    if (!user) {
        throw new Error("User Doesn't exists !!")
    }

    const userId = user?._id
    const { bikeId, startTime } = req.body;

    const bikeRental: Partial<TRental> = {
        userId,
        bikeId,
        startTime: startTime ? startTime : time,
    }
    const bike = await BikeModel.findById(bikeId)
    if (!bike?.isAvailable) {
        throw new Error("This bike is unavailable !!")
    }

    const updateBike = await BikeModel.findByIdAndUpdate(bikeId, { isAvailable: false })
    const result = await RentalModel.create(bikeRental)

    resSend(res, 200, "Rental created successfully", result)
})

const stopRental = catchAsync(async (req, res) => {
    const id = req.params.id
    const rental = await RentalModel.findById(id);
    const bikes = await BikeModel.findById(rental?.bikeId)

    const startTime = new Date(rental?.startTime as Date)
    const returnTime = new Date()
    const returnhours = (returnTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalCost = returnhours * (bikes?.pricePerHour as number)

    const updateBike = await BikeModel.findByIdAndUpdate(bikes?._id, { isAvailable: true })

    const result = await RentalModel.findByIdAndUpdate(id, {
        returnTime, totalCost, isReturned: true
    })

    resSend(res, 200, "Bike returned successfully", result)

})

const getMyRents = catchAsync(async (req, res) => {
    const { email } = req.user
    const user = await userModel.findOne({ email })
    const userId = user?._id
    const result = await RentalModel.find({userId})
    resSend(res, 200, "Rentals retrieved successfully", result)
})


export const rentalController = {
    createRental, stopRental, getMyRents
}