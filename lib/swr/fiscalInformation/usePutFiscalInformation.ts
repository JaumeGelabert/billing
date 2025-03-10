import useSWRMutation from "swr/mutation";
import { putFiscalInformation } from "./putFiscalInformation";

export function usePutFiscalInformation() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/v1/onboarding/fiscal-information",
    putFiscalInformation
  );
  return { trigger, isMutating, data, error };
}
