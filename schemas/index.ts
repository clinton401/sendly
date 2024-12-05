import {z} from "zod";



export const RegisterSchema = z.object({
    name: z.string().trim().min(3, { message: "Name must have at least 3 characters"}).max(50, {
        message: "Name must have at most 50 characters"
    }),
    phone: z
    .string().trim()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format.",
    }),
    password:  z.string()
    .trim()
    .min(6, { message: "Minimum 6 characters required" }),
    address: z
  .string()
  .trim()
  .min(5, { message: "Address must have at least 5 characters." })
  .optional(),
});

export const LoginSchema = z.object({
    phone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must have at least 6 characters." }),
  });

  export const ResetSchema = (isCodeSent: boolean) => z.object({
    phone: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
    otp: z.string()
      .trim() 
      .min(6, { message: "OTP must be at least 6 characters long" })
      .max(6, { message: "OTP must not exceed 6 characters" })
      .optional()
      .refine(val => isCodeSent ? !!val : true, {
        message: "Verification code is required",
      }),
    newPassword: z.string()
      .trim()
      .min(6, { message: "Minimum 6 characters required" })
      .optional()
      .refine(val => isCodeSent ? !!val : true, {
        message: "New password is required",
      }),
  });
  export const OtpSchema = z.object({
    otp: z.string()
      .trim() 
      .min(6, { message: "OTP must be at least 6 characters" })
      .max(6, { message: "OTP must be at most 6 characters" }),
  });
