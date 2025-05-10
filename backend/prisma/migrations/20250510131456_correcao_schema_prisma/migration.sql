/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Instituicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instituicao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "responsavelCpf" TEXT,
ADD COLUMN     "responsavelNome" TEXT,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");
