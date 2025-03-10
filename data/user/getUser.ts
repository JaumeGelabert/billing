import { db } from "@/lib/db";

export const getUserByUserId = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
