/*
  Warnings:

  - Made the column `userId` on table `Field` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_userId_fkey";

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
