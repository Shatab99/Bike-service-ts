import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';

const RentalSchema = new Schema<TRental>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    returnTime: {
        type: Date,
        default: null
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0
    },
    isReturned: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const RentalModel = model<TRental>('Rental', RentalSchema);
