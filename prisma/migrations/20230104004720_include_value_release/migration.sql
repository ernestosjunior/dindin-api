/*
  Warnings:

  - Added the required column `value` to the `releases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "releases" ADD COLUMN     "value" INTEGER NOT NULL;
