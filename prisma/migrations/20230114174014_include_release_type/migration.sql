/*
  Warnings:

  - Added the required column `type` to the `releases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "releases" ADD COLUMN     "type" TEXT NOT NULL;
