/*
  Warnings:

  - You are about to drop the `QRStyle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QRStyle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "QrCustomStyle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "fgColor" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "borderSize" INTEGER NOT NULL,
    "borderRadius" INTEGER NOT NULL,
    "logoEnabled" BOOLEAN NOT NULL,
    "logoSize" INTEGER NOT NULL,
    "logoUrl" TEXT,
    "logoBackgroundColor" TEXT NOT NULL,
    "logoRadius" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "QrCustomStyle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "QrCustomStyle_userId_idx" ON "QrCustomStyle"("userId");
