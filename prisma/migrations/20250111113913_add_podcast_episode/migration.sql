/*
  Warnings:

  - You are about to drop the column `audioFile` on the `PodcastEpisode` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `PodcastEpisode` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PodcastEpisode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "audioFileUrl" TEXT,
    "duration" INTEGER,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PodcastEpisode" ("createdAt", "description", "duration", "id", "imageUrl", "publishedAt", "tags", "title", "updatedAt") SELECT "createdAt", "description", "duration", "id", "imageUrl", "publishedAt", "tags", "title", "updatedAt" FROM "PodcastEpisode";
DROP TABLE "PodcastEpisode";
ALTER TABLE "new_PodcastEpisode" RENAME TO "PodcastEpisode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
