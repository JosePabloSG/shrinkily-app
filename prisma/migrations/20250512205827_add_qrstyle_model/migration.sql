-- CreateTable
CREATE TABLE "QRStyle" (
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
    CONSTRAINT "QRStyle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "QRStyle_userId_idx" ON "QRStyle"("userId");
