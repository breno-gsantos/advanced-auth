'use server'

import { loginSchema } from "@/schemas/data";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Invalid Credentials'}
  }

  return {success: 'Email sent'}
}