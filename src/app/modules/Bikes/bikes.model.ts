import { Schema, model } from 'mongoose';
import { TBike } from './bikes.interface';

// Define the schema
const BikeSchema = new Schema<TBike>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    isAvailable: {
        type:Boolean,
        default:true
    },
    cc: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
});

// Create and export the model
export const BikeModel = model<TBike>('Bike', BikeSchema);
