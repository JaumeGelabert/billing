import { CountryCode } from "@/lib/types/onboarding/countries";
import { z } from "zod";

export const countryFormSchema = z.object({
  country: z.nativeEnum(CountryCode, {
    required_error: "Select a country"
  })
});
