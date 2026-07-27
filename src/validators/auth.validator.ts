import {z} from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .max(100),
    email: z
        .string()
        .trim()
        .email(),
    password: z
        .string()
        .min(8)
        .max(72)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            "Passwords must contain uppercase, lowercase, number and special character."
        ),
});