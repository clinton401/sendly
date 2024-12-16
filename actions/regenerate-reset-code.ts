"use server";
import { rateLimit } from "@/lib/rate-limits";
import getUserIpAddress from "@/hooks/get-user-ip-address";
import { createErrorResponse } from "@/lib/random-utils";
import { unknown_error } from "@/lib/variables";
import { UserModel } from "@/nobox/record-structures/user";
import { twillio } from "@/lib/twillio";
import { otpGenerator } from "@/lib/auth-utils";
import { ResetCodeModel } from "@/nobox/record-structures/reset-code";

export const regenerateResetCode = async (phone: string) => {
  try {
    const userIp = await getUserIpAddress();
    const { error } = rateLimit(userIp, false);
    if (error) {
      return createErrorResponse(error);
    }

    const user = await UserModel.findOne({ phone });
    if (!user) return createErrorResponse("User not found.");

    const { code, expiresAt } = otpGenerator(true);
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
    await twillio(body, user.phone);
    return {
      success: "New password reset code sent to your messages",
      error: undefined,
    };
  } catch (err) {
    console.error(`Unable to regenerate password reset code: ${err}`);
    const errMsg = err instanceof Error ? err.message : unknown_error;
    return createErrorResponse(errMsg);
  }
};
