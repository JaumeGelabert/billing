import { db } from "@/lib/db";

export async function updateFiscalInformationByUserId({
  userId,
  fiscalInformation
}: {
  userId: string;
  fiscalInformation: any;
}) {
  try {
    const updatedFiscalInformation = await db.fiscalInformation.update({
      where: { userId },
      data: {
        ...fiscalInformation
      }
    });
    if (!updatedFiscalInformation) {
      console.log(
        "Error updating fiscal information DATA",
        updatedFiscalInformation
      );
      return null;
    }
    return updatedFiscalInformation;
  } catch (error) {
    console.error("Error updating fiscal information", error);
    return null;
  }
}
