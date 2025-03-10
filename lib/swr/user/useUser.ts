import useSWRMutation from "swr/mutation";
import { getUser } from "./getUser";

export function useUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/v1/user",
    getUser
  );

  return { trigger, isMutating, data, error };
}
