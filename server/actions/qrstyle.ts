"use server";

import { db } from "../data-source";
import { auth } from "@/auth";
import type { QRStylesType } from "@/components/urls/constants";

export async function createQRStyle(style: QRStylesType & { name?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  // Elimina el id si viene del frontend para evitar conflicto con el autogenerado
  const { id: _id, ...styleWithoutId } = style as any;
  return db.qrCustomStyle.create({
    data: {
      ...styleWithoutId,
      userId: session.user.id,
    },
  });
}

export async function getUserQRStyles() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  return db.qrCustomStyle.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteQRStyle(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  // Solo usa el id para borrar, no lo incluyas en el where si no existe
  return db.qrCustomStyle.delete({
    where: { id },
  });
}
