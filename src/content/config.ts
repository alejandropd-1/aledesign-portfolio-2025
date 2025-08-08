import { defineCollection, z } from 'astro:content';

const jobsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['design', 'marketing', 'management']).default('design'),
    place: z.string(),
    type: z.string(),
    period: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
    status: z.enum(['published', 'draft']).default('published'),
  }),
});

export const collections = {
  'jobs': jobsCollection,
};
