import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string()
        .min(8, { message: "Minimum 8 characters required" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
});

