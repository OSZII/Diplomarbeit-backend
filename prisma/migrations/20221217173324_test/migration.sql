/*
  Warnings:

  - You are about to drop the column `fieldOwnerId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_fieldOwnerId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "fieldOwnerId";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";
