import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().min(1),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Name cannot be longer than 30 characters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
  bio: z.string().min(20, { message: "Minimum 20 characters." }).max(1000),
});
