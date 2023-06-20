/*
  Warnings:

  - Added the required column `auth0Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `auth0Id` VARCHAR(127) NOT NULL;
