import { z } from 'zod';

const createRental = z.object({
    body: z.object({
        bikeId: z.string(),
        startTime: z.string().optional(),
    })
});

export const rentalValidation = {
    createRental
}