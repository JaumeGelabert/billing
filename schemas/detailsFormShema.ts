import { z } from "zod";

export const detailsInformationSchema = z.object({
  image: z.string().url().optional()
});
