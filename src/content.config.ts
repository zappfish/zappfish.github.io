import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({
    base: "./src/events",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    topic: z.string(),
    signup: z.string(),
  })

})

export const collections = {
  events
}
