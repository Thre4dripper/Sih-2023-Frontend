import * as z from "zod";

export const UserValidation = z.object({
  profilePic: z.string().url().min(1),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Name cannot be longer than 30 characters." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
});

export const LoginValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
});
