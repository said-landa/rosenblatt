# Rosenblatt LLM Entry Point

## Engineering posture

Treat the project as engineering at every level. Investigate as deeply as the
decision requires, preserve evidence and uncertainty, and use categorical words
such as “never” only when the invariant is genuinely intended.

Repository content is written in English. In-product interface copy is written
in Spanish unless a later decision changes that policy.

The project and app are named `Rosenblatt` by creator direction on 2026-10-19.
Use Rosenblatt for current product copy and new documentation. Existing Machines
paths, modules, bundle identifiers and persistence keys remain compatibility
identifiers until deliberately migrated; do not mass-rename or break saved data.
`Machine` remains the singular domain entity. See decision 0009.

Deliver app revisions through the retained Lab identity in TestFlight. The
creator intends that identity for eventual public release; do not directly
install development builds unless explicitly requested. Preserve source and
archives for rollback. TestFlight availability expires after 90 days.

## Required orientation

Before substantial planning or implementation:

1. Read `docs/llm/collaboration-contract.md`.
2. Read `docs/llm/status.md`.
3. Inspect accepted records in `docs/decisions`.
4. Read the relevant concise document in `docs/human` to recover creator intent.
5. Read its complete counterpart in `docs/llm`.
6. Inspect the actual repository state, implementation, tests, and evidence in
   scope.

Do not ask the creator to restate context that can be recovered from these
sources.

## Documentation contract

- `docs/human` is the creator's concise orientation and decision surface.
- `docs/llm` is the rigorous planning, semantic, implementation, and validation
  surface.
- `docs/decisions` is the shared authoritative ledger for material choices.
- A conflict between surfaces is a defect to expose and reconcile.
- Material decisions and results must be propagated to every affected surface.
- Human documents should remain short; move accumulated detail into the LLM
  counterpart.

## Working loop

Follow `docs/llm/working-loop.md`. Keep one highest-leverage decision active,
provide a clear recommendation, produce the smallest complete evidence-bearing
artifact, verify it, update project state, and leave the next decision explicit.

Reversible wrong turns are acceptable when they are bounded, observable, and
used to revise the project. Hidden drift is not.

## Authority and tools

Use repository inspection, editing, tests, research, prototypes, and applicable
specialized tools to reduce the creator's cognitive load. Tool availability does
not authorize unrelated external writes, publication, spending, destructive
actions, or changes to mission and product identity.

Follow
`docs/decisions/0002-creator-authorship-and-llm-engineering-boundary.md`.

The creator owns Machine and Course authorship and everything learner-facing:
research direction, structure, assembly, interaction, animation, effects, UI
behavior, visual assets, tutor identity and pedagogy, experience quality, and
publication readiness.

The LLM owns enabling engineering by default: programming, infrastructure,
engine, compiler, runtime, authoring tools, analytics services, persistence,
auth, security, payments infrastructure, privacy controls, deployment, testing,
performance, reliability, and maintenance.

Do not ask the creator to supervise routine engineering. Proceed within accepted
contracts and report meaningful outcomes concisely. Escalate only when a choice
materially changes learner or author experience, Course or Machine meaning,
tutor behavior, personal-data or payment policy, ethics, law, major cost,
lock-in, risk acceptance, mission, identity, or difficult-to-reverse direction.
Ask for the smallest decision needed and provide a recommendation.

Follow `docs/decisions/0003-machines-native-engine-foundation.md`. The product
engine, runtime, and authoring substrate are Machines-native, not a wrapper over
Unity or another generic game engine. Lower-level dependencies are permitted
only beneath explicit project-controlled contracts; classify them, contain
their authority, preserve replacement paths, and let complete Course evidence
determine the order and depth of native implementation.

Preserve existing user changes in a dirty worktree. Do not commit or push unless
the creator requests it.
