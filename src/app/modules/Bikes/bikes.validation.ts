import { z } from 'zod';

const createBike = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        pricePerHour: z.number().min(0, "Price per hour must be a positive number"),
        cc: z.number().min(0, "CC must be a positive number"),
        year: z.number().int().min(1900, "Year must be a valid year").max(new Date().getFullYear(), "Year cannot be in the future"),
        model: z.string().min(1, "Model is required"),
        brand: z.string().min(1, "Brand is required")
    })
});
const updateBike = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        pricePerHour: z.number().min(0, "Price per hour must be a positive number").optional(),
        isAvailable:z.boolean().optional(),
        cc: z.number().min(0, "CC must be a positive number").optional(),
        year: z.number().int().min(1900, "Year must be a valid year").max(new Date().getFullYear(), "Year cannot be in the future").optional(),
        model: z.string().min(1, "Model is required").optional(),
        brand: z.string().min(1, "Brand is required").optional()
    })
});


export const bikeValidation = {
    createBike, updateBike
}