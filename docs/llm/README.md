# LLM Documentation

> Human counterpart: [Human Documentation](../human/README.md)

## Purpose

This directory is the rigorous operating memory for LLM collaborators working
on Machines. It preserves enough semantic, process, research, and engineering
context to plan and implement deeply without requiring the creator to carry the
same reading burden.

The documents separate product intent, domain meaning, course production,
engineering doctrine, research, architecture, authoring operations, current
state, and collaboration protocol so that a change in one area does not
silently redefine another.

## Required orientation order

Before substantial work:

1. Read the [collaboration contract](collaboration-contract.md).
2. Read the [current project state](status.md).
3. Inspect accepted records in the [decision ledger](../decisions/README.md).
4. Read the human document for the active subject to recover concise intent.
5. Read the corresponding LLM specification completely.
6. Inspect the actual repository, code, tests, evidence, or artifacts relevant
   to the request.

Do not make the creator reconstruct context that is already recoverable from
these sources.

## Document map

| LLM document | Human counterpart | Governing question | Claim status |
| --- | --- | --- | --- |
| [Status](status.md) | [Status](../human/status.md) | Where is the project now and what decision comes next? | Current state; update after material cycles. |
| [Collaboration contract](collaboration-contract.md) | [Collaboration contract](../human/collaboration-contract.md) | What must the creator and the LLM each know, decide, do, and verify? | Operating policy. |
| [Working loop](working-loop.md) | [Working loop](../human/working-loop.md) | How does uncertainty become decisions and evidence? | Operating protocol. |
| [Vision](vision.md) | [Vision](../human/vision.md) | Why should Machines exist and how should it feel? | Foundational aspiration and product policy. |
| [Philosophy](philosophy.md) | [Philosophy](../human/philosophy.md) | Which commitments order engineering judgment? | Compact governing policy. |
| [Concepts](concepts.md) | [Concepts](../human/concepts.md) | What exists in the domain and what does it mean? | Current domain contract. |
| [Course pipeline](course-pipeline.md) | [Course pipeline](../human/course-pipeline.md) | How does one Machine become a maintained Course? | Process contract to test with the reference course. |
| [Engineering doctrine](engineering-doctrine.md) | [Engineering doctrine](../human/engineering-doctrine.md) | How should the project pursue depth over decades? | Governing engineering policy. |
| [Research program](research-program.md) | [Research program](../human/research-program.md) | What must the project learn and how can results be promoted? | Living research agenda and evidence protocol. |
| [Architecture](architecture.md) | [Architecture](../human/architecture.md) | Which semantic authorities and system boundaries may sustain the vision? | Direction, inherited constraints, and explicit hypotheses. |
| [Course Factory](course-factory.md) | [Course Factory](../human/course-factory.md) | Which integrated authoring capabilities support the pipeline? | Candidate capability and workspace map. |

## Document boundaries

- Vision defines mission, learner promise, experience, and product boundaries;
  it does not select implementation technology.
- Philosophy defines compact ordering commitments.
- Concepts define domain meaning; they do not define storage or service
  boundaries.
- The Course pipeline defines work, artifacts, evidence, and gates; it does not
  prescribe one application per stage.
- Engineering doctrine constrains decisions; it does not make every possible
  native layer an immediate implementation commitment.
- The Research program records questions, methods, evidence, and promotion
  criteria; hypotheses remain distinguishable from adopted contracts.
- Architecture assigns semantic authority, identity, derivation, and system
  responsibility; it does not freeze unsupported implementation details.
- Course Factory defines authoring capabilities and shared workflows; its
  workspaces are not automatically separate applications or repositories.
- Status records the present position; it does not replace durable decisions or
  specifications.
- The Working loop governs collaboration process; it does not decide the
  substantive question by itself.

## Authority and conflict

Accepted records in `docs/decisions` govern explicit choices. Human documents
govern concise intent and active decision framing. LLM documents govern detailed
semantic and engineering contracts. Direct creator instruction supersedes stale
documentation and must be propagated.

If two surfaces conflict:

1. do not silently pick one;
2. identify whether the difference is summary loss, stale state, or a genuine
   decision conflict;
3. surface a decision when creator authority is required;
4. update the decision record when material;
5. repair every affected projection and validate links and terminology.

## Claim discipline

Label material statements through their actual status:

- accepted decision;
- inherited domain constraint;
- architecture contract;
- research hypothesis;
- implementation fact;
- verified result;
- inference;
- recommendation;
- unresolved question.

Planning detail does not turn a hypothesis into an implementation fact.

## Synchronization protocol

When a decision or result changes the project:

1. update or create its shared decision record;
2. update the relevant LLM specification;
3. update the human counterpart with only decision-relevant consequences;
4. update both status documents when current position or next action changes;
5. inspect all inbound and outbound documentation links;
6. scan controlled terminology and contradictions;
7. report what was verified.

Human documents should remain compact. Detail removed from a human document must
either be unnecessary or remain recoverable in the LLM counterpart, decision
ledger, evidence, code, or tests.

## Language convention

Repository documentation is written in English. `Machines` is the project name;
`Machine` is the domain entity. In-product interface copy may follow a separate
language policy when product implementation begins.
