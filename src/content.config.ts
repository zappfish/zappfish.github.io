import { defineCollection, z } from 'astro:content'

const events = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string(),
        date: z.string(),
        time: z.string(),
        location: z.string(),
        topic: z.string(),
        signup: z.string(),
    }),
})

const pis = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullable(),
        project_role: z.string().nullable(),
        institution: z.string(),
        institution_role: z.string().nullable(),
    }),
})

const team = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullable(),
        project_role: z.string().nullable(),
        institution: z.string(),
        institution_role: z.string().nullable(),
    }),
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

export const collections = { events, pis, team, blog }
