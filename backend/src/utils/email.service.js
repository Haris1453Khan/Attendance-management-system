import nodemailer from "nodemailer";

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

export const sendVerificationEmail = async (toEmail, username, token) => {
  const frontendUrl = process.env.FRONT_END_URL || "http://localhost:5173";
  const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

  console.log(`[Email Service] Generated verification link for ${toEmail}: ${verificationUrl}`);

  const htmlContent = `
    <div style="font-family: 'DM Sans', sans-serif; background-color: #F4F1FA; padding: 40px 20px; color: #332F3A;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-family: 'Nunito', sans-serif; color: #7C3AED; margin: 0; font-size: 28px;">Haazri Lagao</h1>
          <p style="color: #635F69; font-size: 14px; margin-top: 4px;">Attendance & Payroll System</p>
        </div>
        
        <h2 style="font-family: 'Nunito', sans-serif; font-size: 22px; color: #332F3A;">Verify Your Email Address</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #635F69;">
          Hi <strong>${username}</strong>,<br/>
          Thank you for signing up for Haazri Lagao! Please click the button below to verify your email address and activate your account.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${verificationUrl}" style="background: linear-gradient(135deg, #9333EA, #7C3AED); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 16px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 8px 16px rgba(124, 58, 237, 0.3);">
            Verify My Email
          </a>
        </div>

        <p style="font-size: 13px; color: #635F69; line-height: 1.5;">
          Or copy and paste this link into your browser:<br/>
          <a href="${verificationUrl}" style="color: #7C3AED; word-break: break-all;">${verificationUrl}</a>
        </p>

        <hr style="border: none; border-top: 1px solid #EFEBF5; margin: 32px 0;" />
        <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin: 0;">
          This verification link will expire in 1 hour. If you did not sign up for this account, please ignore this email.
        </p>
      </div>
    </div>
  `;

  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Haazri Lagao Verification" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Action Required: Verify your Haazri Lagao Email",
      html: htmlContent,
    });
    console.log(`[Email Service] Verification email dispatched successfully to ${toEmail}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`[Email Service] Failed to send email via SMTP:`, error.message);
    // Fallback log so developer can still verify even if SMTP is misconfigured in dev
    console.log(`\n======================================================`);
    console.log(`[DEV FALLBACK VERIFICATION LINK]: ${verificationUrl}`);
    console.log(`======================================================\n`);
    return false;
  }
};
