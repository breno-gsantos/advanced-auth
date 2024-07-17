'use server'

import { registerSchema } from "@/schemas/data";
import { z } from "zod";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Invalid Credentials'}
  }

  return {success: 'User successfully created'}
}