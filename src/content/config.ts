import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
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
	type: 'content',
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
	type: 'content',
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

export const collections = { blog, work, shipped };
