import { auth, type Session } from "@/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import Onboarding from "@/components/onboarding/Onboarding/Onboarding";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session: Session | null = await auth.api.getSession({
    headers: await headers()
  });
  const isOnboardingDone = session?.user.onboarding;
  if (!isOnboardingDone) {
    return (
      <div className="w-fll h-dvh flex flex-col justify-center items-center">
        <Onboarding />
      </div>
    );
  }

  return <LogoutButton />;
}
