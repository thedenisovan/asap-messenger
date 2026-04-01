/*
  Warnings:

  - Added the required column `chatName` to the `GroupChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupChat" ADD COLUMN     "chatName" TEXT NOT NULL;
