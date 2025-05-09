-- CreateTable
CREATE TABLE "Instituicao" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_usuarioId_key" ON "Instituicao"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_cnpj_key" ON "Instituicao"("cnpj");

-- AddForeignKey
ALTER TABLE "Instituicao" ADD CONSTRAINT "Instituicao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
