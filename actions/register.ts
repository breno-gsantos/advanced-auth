'use server'

import { registerSchema } from "@/schemas/data";
import { z } from "zod";
import { hash } from 'bcryptjs'
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: 'Invalid Credentials'}
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {error: 'Email already registered'}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  //Todo: Send verification token email

  return { success: 'User successfully created' }
  
}