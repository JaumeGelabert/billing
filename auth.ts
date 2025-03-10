import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./lib/db";
import { openAPI } from "better-auth/plugins";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql"
  }),
  user: {
    additionalFields: {
      onboarding: {
        type: "boolean",
        defaultValue: false,
        required: false
      },
      country: {
        type: "string",
        defaultValue: "",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }
  },
  plugins: [openAPI()]
});

export type Session = typeof auth.$Infer.Session;
