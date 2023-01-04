/*
  Warnings:

  - You are about to drop the column `releaseId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_releaseId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "releaseId";

-- AlterTable
ALTER TABLE "releases" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "releases" ADD CONSTRAINT "releases_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
