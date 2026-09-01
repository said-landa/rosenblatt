# Human Documentation

> Detailed counterpart: [LLM documentation](../llm/README.md)

This is the creator's working surface for Machines. It is intentionally short.
You should be able to understand the current position and make the next decision
without reading the full technical corpus.

## Read only what the moment requires

Start each working session with:

1. [Current project position](status.md)
2. [Working loop](working-loop.md)

Open another document only when its subject becomes the active decision:

| Question | Read |
| --- | --- |
| What are we trying to create? | [Vision](vision.md) |
| What principles constrain us? | [Philosophy](philosophy.md) |
| How do we divide responsibility? | [Collaboration contract](collaboration-contract.md) |
| What do the core words mean? | [Concepts](concepts.md) |
| What systems may exist? | [Architecture](architecture.md) |
| How does a course move from idea to release? | [Course pipeline](course-pipeline.md) |
| What internal workspaces may support it? | [Course Factory](course-factory.md) |
| How do we judge depth and dependencies? | [Engineering doctrine](engineering-doctrine.md) |
| What must we investigate over decades? | [Research program](research-program.md) |

## What you are expected to decide

Your normal work is to select and investigate Machines, build Courses, design
assembly, author interactions and visual experience, shape the tutor, create
assets, and decide what reaches learners.

Your responsibility is not to approve every implementation detail. You protect:

- the mission;
- the desired learning experience;
- the quality ceiling;
- the project's taste and identity;
- value choices and meaningful tradeoffs;
- decisions whose consequences are hard to reverse.

The LLM should reduce complex material into a concrete decision packet and make
its recommendation explicit.

## What you are not expected to do

You are not expected to:

- remember the entire architecture;
- inspect every invariant or data contract;
- read all research protocols before choosing a direction;
- manually keep documents synchronized;
- know which technical artifact each decision must update.
- supervise routine programming, infrastructure, databases, security, auth,
  analytics services, payment integrations, deployment, or maintenance.

Those are LLM responsibilities under the
[collaboration contract](collaboration-contract.md).

## Shared record

Accepted choices live in the [decision ledger](../decisions/README.md). If a
human summary and a detailed specification disagree, the discrepancy must be
surfaced and repaired.
