import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { resend } from "./resend";
import { emailTemplates } from "@/features/emails/templates/email.templates";
import type { UserRole } from "@/db/schema";
import { ac, owner, admin as adminRole, employee, customer } from "./auth-permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const html = emailTemplates.passwordReset({ name: user.name, actionUrl: url });

      const { error } = await resend.emails.send({
        from: `Corporate Auth <auth${process.env.RESEND_DOMAIN}>`,
        to: [user.email],
        subject: "Reset your corporate account password",
        html,
      });

      if (error) throw new Error(`Resend reset password error: ${error.message}`);
    }
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      const html = emailTemplates.verification({ name: user.name, actionUrl: url });

      const { error } = await resend.emails.send({
        from: `Corporate Auth <auth${process.env.RESEND_DOMAIN}>`,
        to: [user.email],
        subject: "Verify your internal employee account",
        html,
      });

      if (error) throw new Error(`Resend verification error: ${error.message}`);
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },

  plugins: [
    admin({
      ac,
      roles: {
        owner,
        admin: adminRole,
        employee,
        customer,
      },
      defaultRole: "customer",
      adminRoles: ["admin", "owner"],
    }),
    nextCookies(),
  ],
});