import { fiscalInformationSchema } from "@/schemas/fiscalInformationSchema";
import { z } from "zod";

type FiscalInformationFormData = z.infer<typeof fiscalInformationSchema>;

export async function putFiscalInformation(
  url: string,
  { arg }: { arg: FiscalInformationFormData }
) {
  // Validar datos con Zod antes de enviarlos
  const validatedData = fiscalInformationSchema.safeParse(arg);

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
