import { authClient } from "@/auth-client";

export const githubLogin = async () => {
  const { data, error } = await authClient.signIn.social(
    {
      provider: "github",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
    },
    {
      onSuccess: (ctx) => {
        console.log("Sign in successful", ctx);
      }
    }
  );
  return { data, error };
};
