import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return;
  }
};
