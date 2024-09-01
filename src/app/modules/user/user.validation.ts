import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    phone: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" })
  })
});
const updateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['admin', 'user'], { message: "Role must be either 'admin' or 'user'" }).optional()
  })
});

export const userValidation = {
  createValidation, updateValidation
}

