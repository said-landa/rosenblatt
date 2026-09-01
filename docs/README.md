# Documentation Router

Machines has separate documentation surfaces for the creator and for LLM
collaborators. The separation reduces reading load without weakening the
project's technical memory.

`Machines` is the canonical project name everywhere in the repository.

The repository-level `AGENTS.md` routes future LLM sessions into this system.

## Start here

| Reader | Start | Then |
| --- | --- | --- |
| Creator | [Human documentation](human/README.md) | [Current project position](human/status.md) |
| LLM collaborator | [LLM documentation](llm/README.md) | [LLM operating contract](llm/collaboration-contract.md) |
| Either | [Decision ledger](decisions/README.md) | The relevant accepted decision record |

## Documentation spaces

### `docs/human`

Short, clear, decision-oriented documents. They explain what matters, what has
been decided, what remains open, and what decision is needed next. The creator
is not expected to read the LLM corpus to keep the project moving.

### `docs/llm`

Extensive, rigorous documents for planning, implementation, verification, and
continuity across LLM sessions. They preserve definitions, invariants,
provenance, gates, failure modes, and unresolved questions.

### `docs/decisions`

The shared handshake between the creator and LLM collaborators. Accepted
decision records state what was decided, why, what it affects, and what would
justify revisiting it.

## Authority model

The three spaces have different kinds of authority:

- accepted decision records govern explicit project decisions;
- human documents govern concise intent, priorities, and the current decision
  surface;
- LLM documents govern detailed semantic and engineering contracts;
- direct creator instructions supersede stale documentation and must be
  propagated into every affected surface;
- a conflict between surfaces is a documentation defect. An LLM must expose and
  reconcile it rather than silently choosing one version.

Human and LLM documents are paired projections, not independent sources of
truth. Every paired document links to its counterpart.

## Working rule

Each meaningful collaboration cycle should leave at least one durable result:

- an accepted, rejected, deferred, or experimental decision;
- an implemented and verified change;
- evidence that changes a hypothesis;
- a clearly recorded blocker with the next way to investigate it.

The active cycle is defined in the [human working loop](human/working-loop.md)
and the [LLM working-loop protocol](llm/working-loop.md).
