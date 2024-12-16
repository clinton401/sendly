"use server";
import { rateLimit } from "@/lib/rate-limits";
import getUserIpAddress from "@/hooks/get-user-ip-address";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import { otpGenerator } from "@/lib/auth-utils";
import { ResetCodeModel } from "@/nobox/record-structures/reset-code";
import { unknown_error, user_not_found } from "@/lib/variables";
import { UserModel } from "@/nobox/record-structures/user";
import { hasExpired } from "@/lib/auth-utils";
import { twillio } from "@/lib/twillio";
import { validatePassword } from "@/lib/password-utils";

export const reset = async (
  values: z.infer<ReturnType<typeof ResetSchema>>,
  isCodeSent: boolean
) => {
  const userIp = await getUserIpAddress();
  const validatedFields = ResetSchema(isCodeSent).safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      success: undefined,
      redirectUrl: undefined,
      isOtpSent: false,
    };
  }

  try {
    const { error } = rateLimit(userIp, false);
    if (error)
      return {
        error,
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    const { phone, otp, newPassword } = validatedFields.data;
    const { code, expiresAt } = otpGenerator(true);
    const user = await UserModel.findOne({ phone });
    if (!user) {
      return {
        error: user_not_found,
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    }
    if (!isCodeSent) {
      const isCodeAvailable = await ResetCodeModel.findOne({ userId: user.id });
      if (!isCodeAvailable) {
        const body = {
          code,
          expiresAt: expiresAt.toISOString(),
          userId: user.id,
        };
        await ResetCodeModel.insertOne(body);
      } else {
        await ResetCodeModel.updateOneById(isCodeAvailable.id, {
          code,
          expiresAt: expiresAt.toISOString(),
        });
      }
      const body = `Your Sendly password reset code is ${code}. It will expire in 10 minutes. If you didn't request this, please ignore this message.`;
      await twillio(body, phone);
      return {
        success:
          "Message sent successfully! Please check your inbox for the OTP code to proceed.",
        redirectUrl: undefined,
        error: undefined,
        isOtpSent: true,
      };
    }
    if (isCodeSent && (!otp || !newPassword)) {
      return {
        error: "Verification code and new password fields are required",
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    }

    const foundToken = await ResetCodeModel.findOne({ userId: user.id });
    if (!foundToken)
      return {
        error: user_not_found,
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    const isExpired = hasExpired(new Date(foundToken.expiresAt));
    if (isExpired) {
      return {
        error: "Code has expired, generate a new one",
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    }
    const isOtpValid = otp === foundToken.code;
    if (!isOtpValid)
      return {
        error: "Invalid code",
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    if (!newPassword || newPassword.length < 6)
      return {
        error: "Password must be at least 6 characters long",
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    const isPasswordTheSameAsLastOne = await validatePassword(
      newPassword,
      user.password
    );
    if (isPasswordTheSameAsLastOne)
      return {
        error: "New password cannot be the same as the current one",
        success: undefined,
        redirectUrl: undefined,
        isOtpSent: false,
      };
    await UserModel.updateOneById(user.id, { password: newPassword });
    await ResetCodeModel.deleteOneById(foundToken.id)
    return {
      success: "Password changed successfully",
      error: undefined,
      redirectUrl: `/login`,
      isOtpSent: false,
    };
  } catch (err) {
    console.error(`Unable to reset user password: ${err}`);
    return {
      error: err instanceof Error ? err.message : unknown_error,
      success: undefined,
      redirectUrl: undefined,
      isOtpSent: false,
    };
  }
};
