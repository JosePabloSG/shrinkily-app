"use server";

import { db } from "../data-source";
import { auth } from "@/auth";
import type { QRStylesType } from "@/components/urls/constants";

export async function createQRStyle(style: QRStylesType & { name?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return db.qRStyle.create({
    data: {
      ...style,
      userId: session.user.id,
    },
  });
}

export async function getUserQRStyles() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return db.qRStyle.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteQRStyle(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return db.qRStyle.delete({
    where: { id, userId: session.user.id },
  });
}
