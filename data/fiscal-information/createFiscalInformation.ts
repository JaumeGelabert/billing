import { db } from "@/lib/db";

export async function createFiscalInformationByUserId({
  userId,
  fiscalInformation
}: {
  userId: string;
  fiscalInformation: any;
}) {
  try {
    const updatedFiscalInformation = await db.fiscalInformation.create({
      data: {
        userId,
        ...fiscalInformation
      }
    });
    if (!updatedFiscalInformation) {
      console.log(
        "Error creating fiscal information",
        updatedFiscalInformation
      );
      return null;
    }
    return updatedFiscalInformation;
  } catch (error) {
    console.error("Error creating fiscal information", error);
    return null;
  }
}
