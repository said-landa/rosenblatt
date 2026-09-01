# 0001 — Separate Human and LLM Documentation

- Status: Accepted
- Date: 2026-08-24
- Decided by: Creator

## Decision

Machines will maintain separate documentation spaces for human reading and LLM
operation.

Human documents will be short, clear, concrete, and centered on orientation and
decisions. LLM documents will be extensive, rigorous, and centered on semantic
precision, planning, implementation, validation, and continuity. A shared
decision ledger will connect both spaces.

All repository documentation will be written in English.

## Why now

The existing corpus had 4,534 lines in one surface. It was useful for rigorous
planning but imposed too much reading on the creator and did not clearly define
what the creator and the LLM each needed to know, decide, maintain, or verify.

The project also needs a persistent loop for decisions such as reference-course
selection, machine-variant selection, engine boundaries, implementation order,
and evidence-driven correction.

## Alternatives considered

### Keep one documentation set

Rejected because one level of detail cannot remain both comfortably human-sized
and sufficiently rigorous for long-lived LLM collaboration.

### Generate summaries only when requested

Rejected as the primary model because ephemeral summaries do not provide a
stable decision surface and can drift between sessions.

### Maintain two independent documentation trees

Rejected because independent authority would create silent divergence.

## Consequences

- Every pre-existing document receives a human and an LLM version.
- Paired documents link to each other.
- The root `AGENTS.md` becomes the automatic LLM entry point and routes future
  sessions to the rigorous operating contract.
- The creator can operate primarily from `docs/human/README.md` and
  `docs/human/status.md`.
- LLM collaborators must read their operating contract before substantial work.
- Accepted decisions are recorded once in `docs/decisions` and propagated to
  affected human and LLM documents.
- Documentation drift becomes a validation defect.

## Evidence and uncertainty

The split directly addresses current reading overload. Its long-term maintenance
cost is still unknown and must be measured through use. The pairing may later be
partially generated, but generation is not assumed until stable patterns exist.

## Reversibility and revisit triggers

The directory structure is reversible. Revisit the decision if:

- keeping paired documents synchronized repeatedly costs more than it saves;
- the human surface grows beyond practical reading size;
- the LLM surface fails to preserve enough context across sessions;
- a better shared semantic publishing model is demonstrated.

## Resulting next action

Use the decision loop to select the first reference course and its exact machine
variant.
