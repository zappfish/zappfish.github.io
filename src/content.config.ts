import { defineCollection, z, type SchemaContext } from "astro:content";
import { glob, file } from "astro/loaders";

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

const person = (context: SchemaContext) => z.object({
  id: z.string(),
  name: z.string(),
  image: z.nullable(context.image()),
  project_role: z.nullable(z.string()),
  institution: z.string(),
  institution_role: z.nullable(z.string()),
})

const pis = defineCollection({
  loader: file("src/team.json", {
    parser: text => JSON.parse(text).pis
  }),
  schema: person,
})

const team = defineCollection({
  loader: file("src/team.json", {
    parser: text => JSON.parse(text).team
  }),
  schema: person,
})

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
})

const tutorial = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
})

export const collections = {
  pis,
  events,
  team,
  blog,
  tutorial,
}
