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

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
