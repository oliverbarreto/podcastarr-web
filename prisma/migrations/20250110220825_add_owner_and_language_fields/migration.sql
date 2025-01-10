-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PodcastChannel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL DEFAULT '',
    "ownerEmail" TEXT NOT NULL DEFAULT '',
    "language" TEXT NOT NULL DEFAULT 'English',
    "imageUrl" TEXT,
    "explicitContent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PodcastChannel" ("createdAt", "description", "explicitContent", "id", "imageUrl", "title", "updatedAt", "userEmail", "userName") SELECT "createdAt", "description", "explicitContent", "id", "imageUrl", "title", "updatedAt", "userEmail", "userName" FROM "PodcastChannel";
DROP TABLE "PodcastChannel";
ALTER TABLE "new_PodcastChannel" RENAME TO "PodcastChannel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
