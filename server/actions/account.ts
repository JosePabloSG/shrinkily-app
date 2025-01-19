"use server";

import { auth } from "@/auth";
import { db } from "../data-source";
import { revalidatePath } from "next/cache";
import { UNAUTHETICATION_ERROR } from "./actions.config";

interface DeleteAccountResponse {
  success: boolean;
  message: string;
}


export const DeletAccount = async (): Promise<DeleteAccountResponse> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: UNAUTHETICATION_ERROR,
      };
    }

    const userId = session.user.id;

    // Use a transaction to ensure all related data is deleted properly
    await db.$transaction(async (tx) => {
      // Delete sessions first
      await tx.session.deleteMany({
        where: { userId: userId },
      });

      // Delete accounts
      await tx.account.deleteMany({
        where: { userId: userId },
      });

      // Delete URLs and related tags
      await tx.urls.deleteMany({
        where: { creatorId: userId },
      });

      // Delete tags
      await tx.tags.deleteMany({
        where: { creatorId: userId },
      });

      // Finally delete the user
      await tx.user.delete({
        where: { id: userId },
      });
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch (error) {
    console.error("Delete account error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete account",
    };
  }
};