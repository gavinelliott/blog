import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		socialImage: z.string().optional(),
	}),
});

const work = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		client: z.string(),
		role: z.string(),
		featured: z.boolean().optional(),
		draft: z.boolean().optional(),
		heroImage: z.string().optional(),
	}),
});

const shipped = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/shipped' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		stack: z.string(),
		status: z.string(),
		link: z.string().optional(),
		github: z.string().optional(),
		featured: z.boolean().optional(),
		draft: z.boolean().optional(),
		heroImage: z.string().optional(),
	}),
});

const talks = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
 schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { blog, work, shipped, talks };
