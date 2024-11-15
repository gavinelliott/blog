declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2-years-ago.md": {
	id: "2-years-ago.md";
  slug: "2-years-ago";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"a-letter-from-the-future.md": {
	id: "a-letter-from-the-future.md";
  slug: "a-letter-from-the-future";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"a-stand-up-retro-or-planning-does-not-make-you-agile.md": {
	id: "a-stand-up-retro-or-planning-does-not-make-you-agile.md";
  slug: "a-stand-up-retro-or-planning-does-not-make-you-agile";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"change-and-grow.md": {
	id: "change-and-grow.md";
  slug: "change-and-grow";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cleansing-the-soul-with-honest-design.md": {
	id: "cleansing-the-soul-with-honest-design.md";
  slug: "cleansing-the-soul-with-honest-design";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"complaining-is-nothing-without-action.md": {
	id: "complaining-is-nothing-without-action.md";
  slug: "complaining-is-nothing-without-action";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"creating-a-mentor-programme.md": {
	id: "creating-a-mentor-programme.md";
  slug: "creating-a-mentor-programme";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"describing-things.md": {
	id: "describing-things.md";
  slug: "describing-things";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"design-team-ethos.md": {
	id: "design-team-ethos.md";
  slug: "design-team-ethos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"designing-with-the-future-in-mind.md": {
	id: "designing-with-the-future-in-mind.md";
  slug: "designing-with-the-future-in-mind";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"experiences-and-journeys.md": {
	id: "experiences-and-journeys.md";
  slug: "experiences-and-journeys";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"geek-mental-help-week-newcastle.md": {
	id: "geek-mental-help-week-newcastle.md";
  slug: "geek-mental-help-week-newcastle";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"good-product-development-process.md": {
	id: "good-product-development-process.md";
  slug: "good-product-development-process";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hello-you-hello-you-this-is-me.md": {
	id: "hello-you-hello-you-this-is-me.md";
  slug: "hello-you-hello-you-this-is-me";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-ask-for-feedback-that-might-be-hard-to-hear.md": {
	id: "how-to-ask-for-feedback-that-might-be-hard-to-hear.md";
  slug: "how-to-ask-for-feedback-that-might-be-hard-to-hear";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-move-into-a-more-senior-role.md": {
	id: "how-to-move-into-a-more-senior-role.md";
  slug: "how-to-move-into-a-more-senior-role";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"impostor-syndrome.md": {
	id: "impostor-syndrome.md";
  slug: "impostor-syndrome";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"invest-in-yourself.md": {
	id: "invest-in-yourself.md";
  slug: "invest-in-yourself";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"its-ok-to-not-have-all-the-answers.md": {
	id: "its-ok-to-not-have-all-the-answers.md";
  slug: "its-ok-to-not-have-all-the-answers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"its-time-for-something-new.md": {
	id: "its-time-for-something-new.md";
  slug: "its-time-for-something-new";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"lets-start-from-the-beginning.md": {
	id: "lets-start-from-the-beginning.md";
  slug: "lets-start-from-the-beginning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"management-is-great-leadership.md": {
	id: "management-is-great-leadership.md";
  slug: "management-is-great-leadership";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"managers-and-leaders.md": {
	id: "managers-and-leaders.md";
  slug: "managers-and-leaders";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"managing-ics-who-are-a-similar-level-to-yourself.md": {
	id: "managing-ics-who-are-a-similar-level-to-yourself.md";
  slug: "managing-ics-who-are-a-similar-level-to-yourself";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"measuring-effectiveness.md": {
	id: "measuring-effectiveness.md";
  slug: "measuring-effectiveness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"middle-ground.md": {
	id: "middle-ground.md";
  slug: "middle-ground";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"my-2014.md": {
	id: "my-2014.md";
  slug: "my-2014";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"normalised-design.md": {
	id: "normalised-design.md";
  slug: "normalised-design";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"proactive-instead-of-reactive-product-development.md": {
	id: "proactive-instead-of-reactive-product-development.md";
  slug: "proactive-instead-of-reactive-product-development";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"professional-progression.md": {
	id: "professional-progression.md";
  slug: "professional-progression";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"reboot.md": {
	id: "reboot.md";
  slug: "reboot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"service-goals.md": {
	id: "service-goals.md";
  slug: "service-goals";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"so-you-want-to-get-into-web-design.md": {
	id: "so-you-want-to-get-into-web-design.md";
  slug: "so-you-want-to-get-into-web-design";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-day-that-ben-left.md": {
	id: "the-day-that-ben-left.md";
  slug: "the-day-that-ben-left";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-first-days.md": {
	id: "the-first-days.md";
  slug: "the-first-days";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-one-that-didnt-get-away.md": {
	id: "the-one-that-didnt-get-away.md";
  slug: "the-one-that-didnt-get-away";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-rebuild.md": {
	id: "the-rebuild.md";
  slug: "the-rebuild";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"time.md": {
	id: "time.md";
  slug: "time";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"understanding-the-why.md": {
	id: "understanding-the-why.md";
  slug: "understanding-the-why";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"user-centred-success-measures.md": {
	id: "user-centred-success-measures.md";
  slug: "user-centred-success-measures";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"we-are-not-all-equal.md": {
	id: "we-are-not-all-equal.md";
  slug: "we-are-not-all-equal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-the-hardest-part-of-running-a-design-team.md": {
	id: "what-is-the-hardest-part-of-running-a-design-team.md";
  slug: "what-is-the-hardest-part-of-running-a-design-team";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
