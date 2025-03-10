import { db } from "@/lib/db";
import { CountryCode } from "@/lib/types/onboarding/countries";

export async function updateUserCountryByUserId({
  userId,
  country
}: {
  userId: string;
  country: CountryCode;
}) {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId
      },
      data: {
        country
      }
    });
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  } catch (error) {
    return null;
  }
}

export async function updateUserOnboardingByUserId({
  userId
}: {
  userId: string;
}) {
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId
      },
      data: {
        onboarding: true
      }
    });
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  } catch (error) {
    return null;
  }
}
