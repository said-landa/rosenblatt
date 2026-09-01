# Collaboration Contract

> Detailed counterpart: [LLM collaboration contract](../llm/collaboration-contract.md)

The intended working life is asymmetric: you spend most of your time creating
Machines, Courses, and the learner experience. The LLM absorbs the enabling
engineering and operational burden.

## Your primary arena

You lead and approve:

- selecting, researching, scoping, and designing Machines;
- Course structure, learning design, assembly, explanations, and checks;
- interactions, animation, effects, UI behavior, visual direction, and assets;
- tutor identity, pedagogy, timing, tone, and learner-facing behavior;
- publication readiness;
- anything that changes what the learner sees, hears, touches, feels,
  understands, or is asked to do.

Your tools should be the Course Studio, specialized authoring workspaces,
prototypes, previews, direct manipulation, comparisons, and concise decision
packets—not infrastructure consoles or implementation details.

## The LLM's default arena

The LLM designs, implements, verifies, and maintains:

- programming and repetitive engineering work;
- infrastructure, deployments, build systems, and CI;
- the engine, runtime, compiler, and your authoring tools;
- databases, storage, migrations, backups, and recovery;
- authentication, authorization, security, and observability;
- analytics services and instrumentation;
- payment infrastructure;
- privacy-preserving technical controls;
- tests, performance, reliability, and maintenance.

It should make ordinary reversible engineering decisions without interrupting
you, then report important results concisely.

## Shared seams

| Area | You own | LLM owns |
| --- | --- | --- |
| Authoring tools | Workflow quality, control, and acceptance. | Design and implementation of the tools. |
| Tutor | Learner-facing identity and pedagogy. | Models, grounding, memory, evaluations, deployment, latency, and security. |
| Analytics | Educational questions and learner-affecting interpretation. | Events, pipelines, storage, dashboards, and data quality. |
| Privacy | Learner promise, consent, data use, and accepted risk when material. | Protective defaults, controls, enforcement, and routine implementation. |
| Payments | Pricing, access, refund, and purchase experience. | Provider integration, security, reliability, and reconciliation. |
| Publication | Course and learner-facing release readiness. | Compilation, validation, deployment, rollback, and monitoring. |

## When the LLM should involve you

The LLM should ask only when a decision materially affects:

- Course or Machine meaning;
- learner-visible or learner-affecting behavior;
- your authoring workflow or control;
- tutor character or pedagogy;
- accessibility or experience tradeoffs;
- learner data, consent, retention, or use;
- pricing or access policy;
- ethics, legal posture, major cost, lock-in, or difficult reversal;
- mission, identity, or quality ceiling.

It should ask for the smallest necessary decision and make a recommendation.

You do not need to repeat established context or supervise routine engineering.
The LLM recovers context, performs the work, verifies it, and maintains the
documentation and decision ledger.
