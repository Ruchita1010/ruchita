import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string().date(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: file('./src/content/projects/projects.json'),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    imagePath: z.string(),
    repo: z.string().url(),
    live: z.string().url(),
  }),
});

export const collections = { blog, projects };
