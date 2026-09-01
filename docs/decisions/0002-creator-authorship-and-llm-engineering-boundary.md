# 0002 — Creator Authorship and LLM Engineering Boundary

- Status: Accepted
- Date: 2026-08-24
- Decided by: Creator

## Decision

The creator will spend most project time authoring Machines, Courses, and the
learner-facing experience. The LLM will own enabling engineering and operational
work by default and will involve the creator only when a decision crosses a
declared escalation boundary.

The creator owns the intent, authorship, and acceptance of:

- Machine selection, variant selection, research direction, decomposition, and
  educational scope;
- Course structure, assembly path, explanations, checks, and publication
  readiness;
- interactions, animation, effects, interface behavior, visual direction, and
  authored assets;
- tutor identity, pedagogical behavior, learner-facing language, and experience;
- any other decision that changes what the learner sees, hears, touches, feels,
  understands, or is asked to do.

The LLM owns the design, implementation, verification, maintenance, and routine
operation of:

- application and systems programming;
- infrastructure, deployment, CI, build systems, and release automation;
- the native engine, runtime kernel, compiler, and authoring tools;
- databases, storage, migrations, backups, and recovery;
- authentication, authorization, security engineering, and observability;
- analytics infrastructure and instrumentation plumbing;
- payment infrastructure and operational integrations;
- privacy-preserving technical controls and data-governance implementation;
- tests, performance, reliability, maintenance, and repetitive engineering work.

## Boundary rule

The creator owns learner-facing semantics and experience. The LLM owns the
enabling implementation unless the implementation itself creates a material
learner-facing, policy, ethical, financial, legal, or difficult-to-reverse
choice.

The LLM may translate an accepted design into code, optimize it, test it, and
maintain it. It may not silently invent or materially change the design.

## Shared seams

### Authoring tools

The LLM designs and builds the tools. The creator defines whether their workflow,
control, feel, and output are suitable for authoring. Technical internals remain
LLM-owned; material changes to the creator's authoring experience require
creator input.

### Tutor

The creator owns the tutor's learner-facing identity, pedagogy, timing, tone,
behavior, and quality bar. The LLM owns model infrastructure, grounding,
retrieval, memory implementation, evaluation harnesses, deployment, security,
latency, and cost engineering.

### Analytics and learning evidence

The creator owns the educational questions and learner-affecting interpretation.
The LLM owns event infrastructure, data quality, pipelines, storage, dashboards,
and operational analysis. New collection, retention, identification, or use of
learner data crosses the escalation boundary.

### Privacy and security

The LLM applies privacy-preserving and secure defaults, implements controls, and
handles routine engineering. The creator is involved only when a choice changes
the learner promise, consent, data use, retention, legal posture, ethical
position, or accepted risk.

### Payments

The LLM owns provider integration, reliability, reconciliation, security, and
operational implementation. The creator owns learner-visible pricing, purchase,
refund, access, and monetization policy.

### Publication

The creator decides whether a Course and learner-facing revision are ready to
publish. The LLM owns compilation, validation orchestration, deployment,
rollback, recovery, compatibility, and operational monitoring.

## Default autonomy

The LLM should proceed without asking the creator when a decision:

- is within an accepted direction;
- is primarily implementation or operations;
- does not materially alter learner or author experience;
- is reversible at acceptable cost;
- does not introduce substantial lock-in, spending, or external commitment;
- does not change data collection, privacy, security risk acceptance, payment
  policy, or legal posture.

The LLM should report meaningful technical decisions concisely after acting,
without turning them into unnecessary creator decision packets.

## Escalation triggers

The LLM must involve the creator when a choice materially affects:

- the Machine, Course, learning objective, assembly, explanation, or research
  interpretation;
- anything visible, audible, interactive, emotional, or otherwise perceptible to
  the learner;
- the creator's authoring workflow or control over authored output;
- tutor identity or learner-facing pedagogical behavior;
- accessibility or experience tradeoffs that cannot preserve the intended
  quality;
- learner data collection, consent, identification, retention, or use;
- pricing, access, refund, or monetization policy;
- ethical or legal posture;
- large cost, external commitment, substantial lock-in, or difficult reversal;
- mission, product identity, or the quality ceiling.

The LLM should ask for the smallest decision necessary and provide a clear
recommendation.

## Alternatives considered

### Co-decide routine engineering

Rejected because it would pull the creator away from Course and experience
authorship and transfer unnecessary infrastructure burden.

### Let the LLM decide learner-facing behavior by default

Rejected because technical implementation authority does not imply authority
over product taste, pedagogy, or the learner experience.

### Enforce an absolute separation

Rejected because authoring tools, tutor behavior, analytics, privacy, payments,
and publication contain real seams where technical and learner-facing concerns
interact.

## Consequences

- Future planning routes work by ownership before preparing a decision packet.
- Creator decision packets are reserved for creator-owned or escalated seams.
- LLM-owned implementation continues autonomously within accepted boundaries.
- Authoring tools must expose high-quality creator control rather than burying
  learner-facing choices in code.
- Automated proposals and optimizations cannot silently mutate accepted
  learner-facing source.
- Course Factory workspaces must make responsibility and approval explicit.

## Evidence and uncertainty

This boundary reflects the creator's preferred working life and current division
of strengths. The exact seam will be refined through real Course production and
tool use. Repetition, friction, or excessive escalation are evidence that the
boundary needs adjustment.

## Reversibility and revisit triggers

The policy is reversible through a later decision record. Revisit it when:

- the creator repeatedly needs direct control over an LLM-owned system;
- the LLM repeatedly escalates low-value implementation choices;
- a learner-facing capability cannot be separated cleanly from its engine;
- organizational growth introduces additional human roles;
- regulation or risk changes responsibility requirements.

## Resulting next action

Apply the boundary while selecting and building the reference Course. The active
project decision remains selection of its primary Machine and exact variant.
