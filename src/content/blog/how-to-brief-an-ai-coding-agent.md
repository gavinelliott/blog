---
title: 'How to Brief an AI Coding Agent Before It Starts Building'
description: 'A practical brief for AI coding agents: the person, useful result, behaviour, boundaries, evidence and checks, with a worked example and reusable template.'
pubDate: '2026-10-08'
---

I used to bounce between ChatGPT and Codex in tiny phases. Do this. Come back. Review. Do the next bit. Come back again.

That way of working gives you plenty of opportunities to steer. It also makes you responsible for carrying every decision between conversations. You spend a surprising amount of attention explaining what just happened and what should happen next.

I wrote about wanting to give a better master brief and let the agent work through clearer milestones. Someone asked what actually goes into that brief.

Fair question. “Give it better context” only helps if you can explain which context matters.

The part I want to improve is how much of the product thinking happens before implementation starts. Here’s how I’d structure it.

## Start with the person and the moment

“Build an onboarding flow” is a description of work you want produced. It leaves the agent to infer why the flow exists, what someone needs to know and how much effort they will tolerate before doing something useful.

Describe the situation instead. Who is using the product? What have they just done? What are they trying to achieve now?

For a wardrobe app, a useful starting point might be someone adding their first item. That gives us a particular moment to design around. We can discuss choosing an image, confirming what was added and helping them recover if the upload fails.

This is an illustrative brief, rather than a description of Nyah’s current implementation. The distinction matters: an example should help us make decisions without quietly becoming a claim about what already exists.

## Describe a result you can observe

I’d write down what someone should be able to do when this piece of work succeeds.

“The add-item screen is complete” tells me a screen exists. “Someone can add an item and find it again after reopening the app” gives me behaviour to check.

That change in wording helps define the scope. It also exposes the work behind the interface. Saving, retrieving and displaying the item are part of the experience, even if the screenshot looks finished before those things work.

The result should be small enough to demonstrate. If the only meaningful milestone is “the entire product works”, I’d break the task down further.

## Make the behaviour explicit

An interface contains decisions that are easy to leave unstated. What is selected by default? What happens when there is no data? Can someone leave while a request is running? What happens if they press the button twice?

A brief doesn't need to anticipate every possible failure. It should cover the situations that materially affect the journey.

For the add-item example, I’d want to decide whether a failed upload preserves the person’s choices, how a retry works and when the interface is allowed to say the item has been saved. These are product decisions. They deserve to be visible before the implementation settles them for us.

Where I haven’t decided, I’d say so. Ask the agent to explain the options and recommend an approach. An open question is easier to review than a guess presented as a completed feature.

## Name what needs protecting

“Don’t change anything else” sounds clear until the task touches several parts of the product.

Name the boundaries. Existing sign-in behaviour. Subscription access. Saved data. A journey people already rely on. Also name the things the task does not include.

This has been particularly relevant to how I think about Nyah. It grew out of Your Season Guide, the colour-analysis app I built about a year ago. The pivot happened a few weeks ago. Some of the foundations could survive even though the product’s purpose changed.

Keeping those foundations useful requires understanding which behaviour should carry over and which assumptions belong to the old idea. A generic instruction to rebuild the product would leave far too much of that interpretation open.

## Point to evidence that explains the product

Useful context might be an existing journey, a design reference, a particular file, a known constraint or a previous decision with its reasoning attached.

I’d identify the references that matter and explain what each one is evidence of. A screen might demonstrate the visual language without being the right model for the new interaction. An older implementation might explain the data structure while containing behaviour we want to change.

That distinction can save a lot of accidental copying.

Adding more material doesn't automatically make a brief clearer. Someone still has to decide which parts apply. I’d rather make those connections explicit.

## Decide how the result will be checked

Before work starts, describe how you intend to judge it.

For the wardrobe example, the checks could include adding an item successfully, reopening the app to confirm it remains available, handling an unsuccessful upload and retrying without creating duplicates.

The checks should follow the promises made by the brief. Ask for the evidence of what was exercised and an honest account of anything that could not be verified.

A confident completion message isn't enough to make a release decision. I want to know what happened when the journey was tried.

## A brief you can adapt

Here’s a compact starting structure. The example choices below are proposals to make the intended behaviour concrete; they need checking against the product you actually have.

**Person and moment:** Someone has opened the wardrobe app and wants to add their first item from a photo.

**Useful result:** They can choose a photo, confirm the item, save it and find it again after reopening the app.

**Behaviour:** Show progress during upload. Preserve their input if it fails. Offer a retry. Only confirm success after saving succeeds. Prevent a repeated submission from creating the same item twice.

**Boundaries:** Preserve existing sign-in, subscription access and saved wardrobe items. Recommendations, bulk import and changes to pricing are outside this task.

**References:** Identify the current add-item journey, the relevant storage implementation and the design reference. Explain any disagreement between them before implementation.

**Checks:** Demonstrate success, failure and retry. Check that the saved item survives reopening. Report any checks you could not run.

**First milestone:** Inspect the existing product and list the assumptions the proposed approach depends on. Bring back decisions that would change the agreed behaviour or scope.

You can replace the wardrobe example with a checkout, an editing flow or a small internal tool. The useful work is filling in the decisions for that particular situation.

## The brief still needs a review loop

One reply to my earlier post raised a concern about instructions fading during longer agent sessions. It’s a useful reason to check the work against the brief at milestones, rather than assume a detailed opening message will carry the whole task.

Ask for a short account of the current objective, decisions made, checks completed, unresolved questions and next step. Then compare that account with what you intended. A tidy summary can still contain the wrong assumptions.

I’d put review points where a decision could change the direction of the work. An uncertain approach deserves attention before it becomes several polished screens. Routine implementation inside an agreed boundary can have more room.

This is the kind of delegation I want to get better at: enough clarity for the agent to make progress, and enough evidence for me to take responsibility for what ships.
