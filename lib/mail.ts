import { Resend } from "resend";
import EmailVerification from "./email-verification";
import PasswordReset from "./password-reset";
import SignIn from "./signin";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_URL;

export const sendPasswordResetToken = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: process.env.FROM_EMAIL_ADDRESS!,
    to: email,
    subject: "Password Reset",
    react: PasswordReset({ email, token }),
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confrimLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.FROM_EMAIL_ADDRESS!,
    to: email,
    subject: "Confirm your email",
    react: EmailVerification({ email, token }),
  });
};
export const onBoardingMail = async (email: string, fullName: string) => {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL_ADDRESS!,
      to: email,
      subject: "Welcome to PalmTechnIQ",
      react: SignIn({ fullName }),
    });
    return { success: "Signed-Up successfully!" };
  } catch (error) {
    console.error("Error creating account!", error);
    return { error: "Account Creation failed! Try again" };
  }
};
