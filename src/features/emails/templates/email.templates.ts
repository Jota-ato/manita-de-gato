
export const BRAND_COLORS = {
    background: "#FAF6F6",
    card: "#FFFFFF",
    primary: "#C4788A",
    foreground: "#3A2E30",
    muted: "#6B5A5C",
    border: "#EADEE0",
    destructive: "#843B43"
};

const emailLayout = (content: string, accentColor: string = BRAND_COLORS.primary): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin: 0; padding: 0; background-color: ${BRAND_COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${BRAND_COLORS.background}; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: ${BRAND_COLORS.card}; border: 1px solid ${BRAND_COLORS.border}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <tr><td height="4" style="background-color: ${accentColor};"></td></tr>
            <tr><td style="padding: 40px 32px;">${content}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

interface EmailData {
    name: string;
    actionUrl?: string;
}

export const emailTemplates = {
    verification: ({ name, actionUrl }: Required<EmailData>): string => emailLayout(`
    <h1 style="margin: 0 0 16px 0; color: ${BRAND_COLORS.foreground}; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
      Verify your identity
    </h1>
    <p style="margin: 0 0 24px 0; color: ${BRAND_COLORS.muted}; font-size: 15px; line-height: 24px;">
      Hello ${name},<br><br>
      A new internal employee account has been requested with your email address. Please confirm your identity by clicking the link below.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
      <tr>
        <td align="center" bgcolor="${BRAND_COLORS.primary}" style="border-radius: 8px;">
          <a href="${actionUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 500; color: #FFFFFF; text-decoration: none; border-radius: 8px;">
            Verify Corporate Account
          </a>
        </td>
      </tr>
    </table>
    <hr style="border: 0; border-top: 1px solid ${BRAND_COLORS.border}; margin: 32px 0 24px 0;" />
    <p style="margin: 0; color: ${BRAND_COLORS.muted}; font-size: 12px; line-height: 18px;">
      <strong>Security Notice:</strong> This link is intended solely for authorized internal personnel.
    </p>
  `),

    passwordReset: ({ name, actionUrl }: Required<EmailData>): string => emailLayout(`
    <h1 style="margin: 0 0 16px 0; color: ${BRAND_COLORS.foreground}; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
      Reset your password
    </h1>
    <p style="margin: 0 0 24px 0; color: ${BRAND_COLORS.muted}; font-size: 15px; line-height: 24px;">
      Hello ${name},<br><br>
      We received a request to reset the password associated with your internal account. Click the button below to proceed. This link will expire shortly.
    </p>
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
      <tr>
        <td align="center" bgcolor="${BRAND_COLORS.primary}" style="border-radius: 8px;">
          <a href="${actionUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 500; color: #FFFFFF; text-decoration: none; border-radius: 8px;">
            Reset Password
          </a>
        </td>
      </tr>
    </table>
    <hr style="border: 0; border-top: 1px solid ${BRAND_COLORS.border}; margin: 32px 0 24px 0;" />
    <p style="margin: 0; color: ${BRAND_COLORS.muted}; font-size: 12px; line-height: 18px;">
      If you did not request this change, please ignore this email or contact network administration.
    </p>
  `),

    employeeOffboarding: ({ name }: EmailData): string => emailLayout(`
    <h1 style="margin: 0 0 16px 0; color: ${BRAND_COLORS.destructive}; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
      Account Deactivation Notice
    </h1>
    <p style="margin: 0 0 16px 0; color: ${BRAND_COLORS.foreground}; font-size: 15px; line-height: 24px;">
      Hello ${name},
    </p>
    <p style="margin: 0 0 24px 0; color: ${BRAND_COLORS.muted}; font-size: 15px; line-height: 24px;">
      This is an automated notification to inform you that your internal corporate account access has been formally deactivated. Your credentials and active sessions have been purged from the company workspace.
    </p>
    <p style="margin: 0; color: ${BRAND_COLORS.muted}; font-size: 12px; line-height: 18px;">
      If you believe this was an operational error, please contact your systems manager immediately through official corporate channels.
    </p>
  `, BRAND_COLORS.destructive)
};