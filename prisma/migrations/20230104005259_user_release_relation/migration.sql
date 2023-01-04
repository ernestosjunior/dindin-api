/*
  Warnings:

  - Added the required column `userId` to the `releases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "releases" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "releases" ADD CONSTRAINT "releases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
