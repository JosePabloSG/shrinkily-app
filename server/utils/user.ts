import { db } from "../data-source";

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};