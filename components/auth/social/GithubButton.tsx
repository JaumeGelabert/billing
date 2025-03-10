"use client";

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";
import { CheckIcon, GithubIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function GithubButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    const { data, error } = await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
          console.log("Sign in request", ctx);
        },
        onSuccess: (ctx) => {
          setIsSuccess(true);
          setIsLoading(false);
          console.log("Sign in successful", ctx);
        }
      }
    );
  };

  return (
    <Button
      onClick={handleClick}
      className="w-60"
      disabled={isLoading || isSuccess}
    >
      {isLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : isSuccess ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <GithubIcon className="h-4 w-4" />
      )}
      Continue with Github
    </Button>
  );
}
