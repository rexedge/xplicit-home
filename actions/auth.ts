"use server";

import { signIn, signOut } from "@/auth";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas";
import { generateverificationToken } from "@/lib/token";
import getUserByEmail from "@/data/user";

export const logout = async () => {
  await signOut();
};

export const loginGoogle = async () => {
  await signIn("google", {
    redirectTo: "/",
  });
};

export const loginCredentials = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return response;
  } catch (error) {
    return { error: "Invalid credentials" };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const verificationToken = await generateverificationToken(email);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role: "USER",
      verificationToken: verificationToken.token,
      isVerified: false,
    },
  });

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
