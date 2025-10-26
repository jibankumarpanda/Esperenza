-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "blockNumber" BIGINT,
ADD COLUMN     "txHash" TEXT;

-- AlterTable
ALTER TABLE "ReferralUsage" ADD COLUMN     "blockNumber" BIGINT,
ADD COLUMN     "txHash" TEXT;
