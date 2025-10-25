-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phoneE164" TEXT NOT NULL,
    "phoneHash" TEXT NOT NULL,
    "pepper" TEXT,
    "walletAddress" TEXT NOT NULL,
    "encryptedPrivKey" TEXT NOT NULL,
    "dekPublicKey" TEXT,
    "dekEncrypted" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneE164_key" ON "User"("phoneE164");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneHash_key" ON "User"("phoneHash");
