/*
  Warnings:

  - You are about to drop the column `url` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_url_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "url",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_address_key" ON "Url"("address");
