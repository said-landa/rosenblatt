# LLM Working-Loop Protocol

> Human counterpart: [Working Loop](../human/working-loop.md)

## Objective

Maintain continuous forward motion from ambiguity to decision, evidence,
implementation, and correction while keeping the creator's reading surface
small.

## Loop state machine

```text
ORIENT
  -> ROUTE_OWNERSHIP
  -> FRAME_DECISION
  -> PREPARE_PACKET
  -> DECIDE_OR_EXPERIMENT
  -> RECORD
  -> PROPAGATE
  -> BUILD_OR_INVESTIGATE
  -> VERIFY
  -> INTERPRET
  -> SET_NEXT_STATE
  -> ORIENT
```

The loop can return to an earlier state when new evidence invalidates its input.
Returning is a correction mechanism, not a process failure.

## 1. Orient

Read the current state, accepted decisions, active human projection, relevant
LLM specifications, and actual repository state. Identify contradictions,
staleness, and unverified claims.

Output: a bounded state model sufficient for the current work.

## Responsibility routing

Before preparing a decision packet, classify the work against
[Decision 0002](../decisions/0002-creator-authorship-and-llm-engineering-boundary.md):

- **Creator-owned:** Machine, Course, research direction, authored experience,
  learner-facing behavior, or publication readiness. Prepare a concise packet or
  authoring surface.
- **LLM-owned:** programming, infrastructure, engine, tools, services,
  persistence, security, operations, testing, or maintenance within accepted
  boundaries. Implement and verify without requesting routine supervision.
- **Shared seam:** a technical choice affects learner experience, authoring
  control, data policy, payments policy, ethics, law, major cost, lock-in, or
  difficult reversal. Do the technical analysis first, then ask for the smallest
  creator decision required.

Routing is not a claim that the areas are isolated. It determines who owns the
choice and how much creator attention is justified.

## 2. Frame the decision

Choose the decision that unlocks the most valuable evidence or construction.
Prefer dependencies that block several downstream choices. Do not ask the
creator to decide an implementation detail that follows safely from an accepted
contract.

For LLM-owned work, frame the engineering decision internally, choose a strong
default, preserve rationale when material, and continue to implementation. A
creator-facing decision packet is unnecessary unless an escalation trigger is
present.

Classify the decision:

- identity-defining;
- semantic;
- architectural;
- research;
- product or course scope;
- implementation;
- operational.

Also classify reversibility, replacement cost, uncertainty, and urgency.

## 3. Prepare the decision packet

When creator authority is required, the human-facing packet contains:

1. decision in one sentence;
2. why now;
3. two to four serious options;
4. explicit recommendation;
5. evidence, inference, and unknowns;
6. consequences and cost of being wrong;
7. reversibility and revisit trigger;
8. work or evidence unlocked next.

Keep detailed matrices, source analysis, and contract implications in the LLM
surface or a supporting research artifact. Present them only when requested or
when the decision cannot be responsible without them.

## 4. Decide or authorize an experiment

Valid outcomes are:

- Accepted;
- Rejected;
- Deferred;
- Experimental;
- Superseded.

If uncertainty can be reduced cheaply, recommend an experimental decision with
a time or evidence boundary instead of pretending permanence.

For LLM-owned work, the LLM may accept a reversible engineering decision itself
within the authorized direction. It should report the result, not ask the
creator to perform routine technical governance.

## 5. Record

Create or update a shared decision record for material choices. Capture exact
scope, rationale, alternatives, uncertainty, consequences, reversibility,
revisit triggers, and resulting action.

## 6. Propagate

Update every semantic consumer affected by the decision:

- human orientation;
- LLM specification;
- current state;
- models and schemas;
- code and tests;
- research protocols;
- course artifacts;
- validation suites;
- build, pilot, or release records.

Use impact analysis where available. Until automated, perform an explicit
terminology and link scan.

## 7. Build or investigate

Choose the smallest complete artifact capable of testing the decision. Small
does not mean superficial: the artifact must cross every boundary required to
produce the intended evidence.

Examples include:

- a candidate comparison;
- an exact machine-variant dossier;
- a complete low-fidelity course;
- one vertical lesson through authoring, compilation, runtime, and tutor;
- a replacement or exit exercise;
- an evaluator with declared baselines and failure criteria.

## 8. Verify

Define acceptance criteria before interpreting the result. Separate:

- structural verification;
- domain review;
- pedagogical evidence;
- behavioral tests;
- qualitative observation;
- operational checks.

Record negative results, missing validation, and uncertainty. Tool success is
not automatically outcome success.

## 9. Interpret

State what the evidence supports, what it weakens, and what remains unknown.
Avoid causal language unless the method supports it. Do not infer learner mental
state directly from completion, time, or clicks.

## 10. Set the next state

Update both status documents with:

- what changed;
- what is now established or rejected;
- current implementation and verification state;
- the next highest-leverage decision;
- the concrete action available immediately.

The creator should be able to resume from the human status document without
reading prior conversation history.

## Anti-stall rules

- Do not broaden the architecture merely because more detail can be written.
- Do not postpone a reversible evidence-producing action for speculative
  completeness.
- Do not let a prototype silently become a permanent dependency.
- Do not advance a stage when its gate lacks evidence.
- Do not treat a wrong but informative step as wasted if its evidence is
  recorded and used.
- Do not end a planning cycle with several equally vague next steps; identify
  the first decision or action.
