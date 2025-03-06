"use client";

import { Button } from "@/components/ui/button";
import { githubLogin } from "@/lib/auth/login/github/githubLogin";

export default function GithubButton() {
  return <Button onClick={githubLogin}>Continue with Github</Button>;
}
