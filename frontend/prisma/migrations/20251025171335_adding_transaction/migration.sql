-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "txHash" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "donation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "blockNumber" BIGINT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txHash_key" ON "Transaction"("txHash");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
