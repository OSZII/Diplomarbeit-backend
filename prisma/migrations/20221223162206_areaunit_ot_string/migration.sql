/*
  Warnings:

  - Changed the type of `unit` on the `Field` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AreaUnit";
