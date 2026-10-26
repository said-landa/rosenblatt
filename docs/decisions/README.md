# Decision Ledger

This directory is the shared decision boundary between the creator and LLM
collaborators.

## What belongs here

A decision record is required when a choice materially changes:

- project intent or product character;
- the reference course or its machine variant;
- semantic definitions or invariants;
- architecture or native-tool boundaries;
- research direction or evidence requirements;
- a quality gate;
- a dependency with meaningful lock-in or replacement cost;
- the order of major work.

Routine implementation details can remain in code, tests, issues, or the
relevant LLM document.

## Status vocabulary

| Status | Meaning |
| --- | --- |
| Proposed | Prepared for a decision but not yet accepted. |
| Experimental | Authorized temporarily to produce evidence. |
| Accepted | Governs current work. |
| Rejected | Considered and not selected. |
| Superseded | Replaced by a later record. |
| Deferred | Intentionally postponed with a revisit trigger. |

## Required structure

Each record contains:

1. status and date;
2. decision;
3. reason the decision is needed now;
4. considered alternatives;
5. consequences and affected documents;
6. evidence and uncertainty;
7. reversibility and revisit triggers;
8. resulting next decision or action.

Use a four-digit sequence and a short English slug, for example:
`0004-select-reference-course.md`.

## Ledger

| Record | Status | Decision |
| --- | --- | --- |
| [0001](0001-separate-human-and-llm-documentation.md) | Accepted | Separate human and LLM documentation while sharing one decision ledger. |
| [0002](0002-creator-authorship-and-llm-engineering-boundary.md) | Accepted | Keep Machine, Course, and learner-experience authorship with the creator while the LLM owns enabling engineering by default. |
| [0003](0003-machines-native-engine-foundation.md) | Accepted | Build a Machines-native engine rather than adopting a generic game engine as the product foundation. |
| [0004](0004-select-w1-pin-tumbler-reference-course.md) | Superseded | Use the Master Lock W1 four-pin pin-tumbler cylinder as the first bounded reference Course. |
| [0005](0005-select-reference-padlock-01.md) | Accepted | Use an original complete keyed padlock and teach it through visual assembly and causal change. |

- [0006 — Machines Lab Course Navigation](0006-machines-lab-course-navigation.md)

- [0007 — Shared Origin Journey](0007-shared-origin-journey.md) — Experimental Lab opening; full journey Proposed.

- [0008 — Constructive Foundation and Shared Branches](0008-constructive-foundation-and-shared-branches.md) — Accepted direction; exact lessons in design.

- [0009 — Rosenblatt and One TestFlight Delivery Identity](0009-rosenblatt-lab-testflight-delivery.md) — Accepted creator direction; one retained app and versioned releases.

- [0010 — Assembly Journey Experience](0010-assembly-journey-experience.md) — Accepted requirements; bounded foundation-plus-circuit study authorized 2026-10-23.

- [0011 — Machine-First Investigation and Code Collaboration](0011-machine-first-investigation-and-code-collaboration.md) — Accepted direction; next Machine pending.
