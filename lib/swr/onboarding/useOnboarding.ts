import { postOnboarding } from "./putOnboarding";
import useSWRMutation from "swr/mutation";

export function useOnboarding() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/v1/onboarding/country",
    postOnboarding
  );

  return { trigger, isMutating, data, error };
}
