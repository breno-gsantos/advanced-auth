import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({message: 'Email is required'}),
  password: z.string().min(1, {message: 'Password is required'})
})

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Your name must be at least 2 characters long" }).max(50, { message: "Your name must be less than 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/, {
      message: "Password must include at least one uppercase letter, one lowercase letter, one number and one special character",}).max(20, {message: "Password mustn't have more than 20 characters"}),
  confirmPassword: z.string()}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Password doesn't match",
  })