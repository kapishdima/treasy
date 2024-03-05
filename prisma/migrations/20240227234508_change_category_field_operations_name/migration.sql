-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "plannedAmount" DROP NOT NULL,
ALTER COLUMN "plannedAmount" SET DEFAULT 0,
ALTER COLUMN "includedInBudget" DROP NOT NULL,
ALTER COLUMN "includedInBudget" SET DEFAULT false;
