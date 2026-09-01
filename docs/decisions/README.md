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
