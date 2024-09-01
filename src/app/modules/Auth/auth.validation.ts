import { z } from 'zod';

export const login = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    })
});

export const authValidation = {
    login
}


