'use server'

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas/data";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Invalid Credentials'}
  }

  const { email, password } = validatedFields.data
  
  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })

    return {success: 'Logged In!'}
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: 'Invalid Credentials'}
        default:
          return {error: 'Something went wrong!'}
      }
    }

    throw error;
  }
} 