---
title: 'Most design systems are optimised for the wrong thing'
description: 'Design systems were built to give humans consistent options. Agents do not want options, they want a single correct answer. That turns the design system into constraint logic rather than a component library.'
pubDate: '2026-08-14'
---

Most design systems are optimised for consistency.

That's about to become the problem.

### Consistency was the whole point

For a decade, consistency was the goal. Same components, same spacing, same patterns, everywhere. The pitch was simple: if everything looks and behaves the same, quality goes up and cost goes down.

That worked when humans were the only consumers.

A designer opens a library, picks a component, applies judgment about whether it fits the context. The system provides options. The human provides decisions.

Agents don't work that way.

### Agents don't browse, they query

An agent doesn't browse a library. It queries a system and expects an answer.

Not a set of options. Not a flexible token with eight variants. A single, context-appropriate response that it can use without asking a follow-up question.

Which means the design system's job is no longer "here are your options, pick one." It's "given this context, here's what you should use and here's what you must not do."

That's a fundamentally different product. And most design systems aren't built for it.

### What this looks like from the inside

I've been watching this shift from inside a system that serves hundreds of engineers across dozens of countries.

The moment we started looking at agent consumption against our system, the gaps were immediate.

Our documentation was written for humans who could infer intent. Our tokens assumed a designer would know which variant to reach for. Our components had flexibility built in as a feature.

### Flexibility becomes a liability

For agents, all of that flexibility is a liability.

Every ambiguous token is a place where an agent guesses. Every undocumented constraint is a place where it confidently builds something that technically uses the system and completely misses the intent behind it.

That second one is the dangerous failure. It doesn't look like a failure. It passes review. It uses approved components. It is still wrong.

### The systems that matter will be the ones that can say no

The design systems that will matter in two years aren't the ones with the most components. They're the ones that can say no.

That can tell an agent "you cannot combine these two patterns."

Or "this layout requires a disclosure component in this jurisdiction."

Or "this flow needs a human confirmation step before it commits."

Constraint logic. Not component libraries.

The strange part is that this makes the design system more important than it has ever been, while making it look almost nothing like what most teams are building today. The system stops being a box of parts and starts being the thing that encodes product judgment at scale.

### Nobody is staffed for this

The teams running these systems are not set up for that work.

Most design system teams are still measured on adoption and coverage. Not on how well their system governs agent behaviour, or how reliably it prevents misuse.

I don't think most organisations have realised that their design system team is about to become an infrastructure team in the truest sense. Not infrastructure for designers. Infrastructure for every automated system that touches the product surface.

That's a different job, and almost nobody is hiring for it yet.

What's the first thing that would break in your design system if an agent tried to consume it tomorrow?
