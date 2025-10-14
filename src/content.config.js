import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/post" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateFormatted: z.string(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/project" }),
  schema: z.object({
    name: z.string(),
    order: z.number().optional(),
    description: z.string(),
    cover: z.string(),
    images: z.array(z.string()).default([]).optional(),
    technologies: z.array(z.string()).default([]).optional(),
    deployment: z.string().optional(),
    repository: z.string().optional(),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
