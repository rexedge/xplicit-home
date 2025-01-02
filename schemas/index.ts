import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phone: z
    .string()
    .min(1, {
      message: "Phone number is required",
    })
    .regex(
      /^(0|\+?234)?[789][01]\d{8}$/,
      "Phone format (+2348012345678/08012345678)"
    ),
});
