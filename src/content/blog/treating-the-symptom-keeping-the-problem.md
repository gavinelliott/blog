---
title: 'Treating the symptom, keeping the problem'
description: 'How AI chat and other workarounds can leave the underlying design problems in a SaaS product unresolved, adding complexity and extending design debt.'
pubDate: '2026-11-27'
---

A customer opens an AI assistant and asks what’s happening with their request.

The assistant tells them it’s waiting for approval, who needs to approve it and what happens next.

Useful answer. But why did they need to ask?

If that information already exists in the application, why wasn’t it visible alongside the request? If something needed their attention, why hadn’t the application told them?

We can build a very capable assistant to answer those questions. We should also recognise that some of those questions exist because of how we’ve designed the product.

The customer’s uncertainty is the symptom. The missing information and context are the design problem.

Answering the question helps in that moment. It doesn’t necessarily address why the question needed asking.

This is a pattern we can fall into across a SaaS platform. We see someone struggling and design something to help them through it. A tooltip. A checklist. A notification. A help article. An AI assistant.

Each addition can be useful. But we need to understand whether we’re removing the difficulty or helping people live with it.

Take information and status.

People need to understand what’s happening, what it means for them and whether they need to act. We should make deliberate decisions about where to inform them and when to notify them.

A request’s status belongs with the request. An explanation of a blocker belongs where someone encounters that blocker. A change that requires someone’s input might warrant a notification, with enough context to understand it and a route to the action.

Sending everything to a notification centre won’t resolve this either. We can still leave people searching, checking and piecing things together. We’ve just moved the information somewhere else.

The design work is understanding what someone needs to know at that point in their task.

The same thinking applies beyond information.

Imagine customers regularly choosing the wrong option during setup. We could add descriptions, examples and a warning before they continue. Those changes might help. But we also need to understand why the choice is difficult. Perhaps the options reflect our internal team structure, using distinctions that mean very little to a customer.

We could spend months explaining a choice we need to reconsider.

Or imagine an administrator entering the same information in several parts of the application. We add a completion checklist and reminders because people keep missing a step. Yet the repetition might exist because different features were built independently and each has its own version of the same setting.

The checklist helps someone navigate that fragmentation. Resolving the fragmentation could remove the repeated work.

Even confirmation dialogues deserve the same scrutiny. If people regularly take an action they later regret, another “Are you sure?” might be appropriate. But perhaps the action is poorly labelled, its scope is unclear or it sits too close to something people use frequently. We need to investigate what is causing the mistakes.

These examples share something: the visible difficulty gives us somewhere to start investigating. It doesn’t, by itself, tell us what to build.

That matters because treating symptoms has a cost beyond the first intervention.

The helper text needs maintaining. The checklist needs completion rules. The reminders need triggers and preferences. The assistant needs access to the right information and a reliable way to explain it.

Other features then start depending on those additions. New teams follow the existing pattern. Customers learn the workaround and support teams teach it.

Eventually, addressing the original problem means untangling everything we’ve built around it.

That’s how design debt can grow. We defer a difficult decision, build around it and increase the effort required to return to it later. The debt also lasts longer because the workaround reduces the immediate pressure to resolve the cause.

It can even look like success.

Customers are using the assistant. More people are completing the checklist. Fewer people are contacting support.

Those results can represent real improvements. They still leave us with a question: how much unnecessary effort does the customer have to make?

A successful chat response tells us that someone received an answer. It doesn’t tell us whether a conversation should have been necessary.

There will always be times when we need an immediate fix. We might be able to improve an explanation today while changing the underlying workflow takes months. People shouldn’t have to struggle while we work towards something better.

But we should be explicit about what we’ve achieved. We’ve reduced the impact of a problem. We still need to address its cause.

That means keeping the underlying issue visible, giving someone responsibility for it and deciding when the temporary measure can be removed.

It also means looking across the service. The cause might sit in permissions, a data model, a policy or the handover between teams. A designer working on one screen may uncover a problem that needs several teams to resolve.

Before adding another layer, we need to ask what keeps making that layer necessary.

If people repeatedly ask what’s happening, examine how the product communicates.

If they repeatedly choose the wrong thing, examine the choice.

If they repeatedly miss a step, examine why the step exists and how it fits into the task.

AI chat makes this especially visible because customers can tell us, in their own words, what they’re struggling to understand. Those conversations should inform the design of the wider product as well as improvements to the assistant.

Some questions will always benefit from a conversation. Others should lead us back to the experience and ask:

Why have we made someone ask for this in the first place?
