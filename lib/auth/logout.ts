import { authClient } from "@/auth-client";
import { redirect } from "next/navigation";

export const logout = async () => {
  const { data, error } = await authClient.signOut({
    fetchOptions: {
      onSuccess: (ctx) => {
        console.log("Sign out successful", ctx);
        redirect("/sign-in");
      },
      onError: (ctx) => {
        console.log("Sign out error", ctx, ctx.error);
      }
    }
  });
  return { data, error };
};
