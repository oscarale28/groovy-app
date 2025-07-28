import { z } from "zod";

export const createPlaylistSchema = z.object({
  name: z.string().min(1, "Playlist name is required"),
  description: z.string().nullable(),
  visibility: z.enum(["public", "private"]).default("private").nonoptional(),
});

export type CreatePlaylistFormValues = z.infer<typeof createPlaylistSchema>;
