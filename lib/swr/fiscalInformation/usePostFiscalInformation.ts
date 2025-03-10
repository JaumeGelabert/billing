import useSWRMutation from "swr/mutation";
import { postFiscalInformation } from "./postFiscalInformation";

export function usePostFiscalInformation() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/v1/onboarding/fiscal-information",
    postFiscalInformation
  );
  return { trigger, isMutating, data, error };
}
