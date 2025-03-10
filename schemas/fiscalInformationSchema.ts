import { z } from "zod";

export const fiscalInformationSchema = z.object({
  fiscalName: z.string().nonempty({
    message: "Enter your fiscal name"
  }),
  fiscalNumber: z.string().nonempty({
    message: "Enter your fiscal number"
  }),
  fiscalAddress: z.string().nonempty({
    message: "Enter your fiscal address"
  }),
  fiscalCity: z.string().nonempty({
    message: "Enter your fiscal city"
  }),
  fiscalZipCode: z.string().nonempty({
    message: "Enter your fiscal zip code"
  }),
  fiscalPhone: z.string().nonempty({
    message: "Enter your fiscal phone"
  }),
  fiscalEmail: z.string().email({ message: "Enter a valid email" })
});
