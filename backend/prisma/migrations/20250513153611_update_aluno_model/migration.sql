/*
  Warnings:

  - You are about to drop the column `serie` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `turma` on the `Aluno` table. All the data in the column will be lost.
  - Added the required column `turmaId` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "serie",
DROP COLUMN "turma",
ADD COLUMN     "turmaId" TEXT NOT NULL;
