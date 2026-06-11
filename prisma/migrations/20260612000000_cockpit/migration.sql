-- Idempotent on purpose: the first production apply was interrupted mid-flight
-- by a rolling deploy, so this migration must survive a partial prior apply.

-- CreateTable
CREATE TABLE IF NOT EXISTS "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "AiConversation" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "AiMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AiConversation_updatedAt_idx" ON "AiConversation"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "AiMessage_conversationId_createdAt_idx" ON "AiMessage"("conversationId", "createdAt");

-- AddForeignKey (guarded — Postgres has no IF NOT EXISTS for constraints)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AiMessage_conversationId_fkey'
  ) THEN
    ALTER TABLE "AiMessage"
      ADD CONSTRAINT "AiMessage_conversationId_fkey"
      FOREIGN KEY ("conversationId") REFERENCES "AiConversation"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
