-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "instituicaoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
