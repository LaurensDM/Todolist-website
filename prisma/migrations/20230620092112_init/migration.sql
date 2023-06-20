/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `list` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    MODIFY `updatedAt` DATETIME(3) NULL;
