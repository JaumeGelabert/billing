import { db } from "@/lib/db";

export const getFiscalInformation = async (userId: string) => {
  try {
    const fiscalInformation = await db.fiscalInformation.findUnique({
      where: { userId }
    });
    if (!fiscalInformation) return null;
    return fiscalInformation;
  } catch (error) {
    console.error("ERROR", error);
    return null;
  }
};
