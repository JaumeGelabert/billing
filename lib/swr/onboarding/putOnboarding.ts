import { countryFormSchema } from "@/schemas/countryFormSchema";
import { z } from "zod";

type CountryFormData = z.infer<typeof countryFormSchema>;

export async function postOnboarding(
  url: string,
  { arg }: { arg: CountryFormData }
) {
  // Validar datos con Zod antes de enviarlos
  const validatedData = countryFormSchema.safeParse(arg);

  if (!validatedData.success) {
    throw new Error(JSON.stringify(validatedData.error.format()));
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(validatedData.data)
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to submit onboarding data");
  }

  return response.json();
}
