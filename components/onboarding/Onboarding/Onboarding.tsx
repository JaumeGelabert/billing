import { auth } from "@/auth";
import Stepper from "@/components/onboarding/Stepper/Stepper";
import { headers } from "next/headers";

export default async function Onboarding() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const onboarding = session!.user!.onboarding!;

  if (!onboarding) {
    return (
      <>
        <Stepper />
      </>
    );
  }

  <p>Dashboard</p>;
}
