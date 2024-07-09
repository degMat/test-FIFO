-- CreateEnum
CREATE TYPE "EntityState" AS ENUM ('ARCHIVED', 'NON_CONSUMED', 'CONSUMED');

-- CreateTable
CREATE TABLE "TypeAction" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "creditMax" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentValue" INTEGER NOT NULL,

    CONSTRAINT "TypeAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,
    "typeActionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" "EntityState" NOT NULL DEFAULT 'NON_CONSUMED',

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeAction_libelle_key" ON "TypeAction"("libelle");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_typeActionId_fkey" FOREIGN KEY ("typeActionId") REFERENCES "TypeAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
