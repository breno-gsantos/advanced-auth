import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from "./lib/db";
import { loginSchema } from "@/schemas/data";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      }
    })
  ],
})