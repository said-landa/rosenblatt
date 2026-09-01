# Course Factory

> Detailed counterpart: [LLM Course Factory](../llm/course-factory.md)

The Course Factory is the integrated capability for researching, designing,
building, validating, releasing, and improving courses. Its workspaces are
projections of one semantic system, not assumed separate applications.

## Candidate workspaces

| Workspace | Main responsibility |
| --- | --- |
| Course Control | Scope, state, responsibility, decisions, risks, and all pipeline gates. |
| Evidence & Knowledge Studio | Sources, claims, terminology, machine decomposition, concepts, and relationships. |
| Learning Design Studio | Outcomes, chapters, lessons, objectives, explanations, checks, and prototypes. |
| Assembly & Visual Studio | Semantic geometry, assembly states, interactions, camera, motion, and representations. |
| Tutor Lab | Tutor context, pedagogy, limits, expected behavior, datasets, and evaluations. |
| Build & Preview | Compilation, diagnostics, exact-revision preview, integration, and validation. |
| Release & Learning Observatory | Pilots, releases, observations, interpretations, maintenance, and longitudinal evidence. |

## Creator and LLM split

You primarily inhabit Evidence & Knowledge, Learning Design, Assembly & Visual,
and the learner-facing part of Tutor Lab. You also own the Course decisions in
Course Control and decide when the authored Course is ready to publish.

The LLM builds and operates Course Studio, the workspaces, semantic substrate,
compiler, runtime, representation engine, tutor infrastructure, Build & Preview,
analytics services, storage, security, and release machinery. It should expose
those capabilities as excellent authoring controls rather than asking you to
manage their internals.

At shared seams, learner-facing meaning and experience remain yours; enabling
implementation remains the LLM's.

The execution and visual foundation is the Machines-native engine established
by [Decision 0003](../decisions/0003-machines-native-engine-foundation.md), not
an export step into a generic game engine.

## Shared behavior

A meaningful change should reveal every affected representation, lesson,
explanation, tutor evaluation, build, and published revision. Each workspace
reads and writes typed records with stable identity, revision, provenance, and
review state.

## Build rule

These workspaces describe capabilities that may be needed. They are not a
commitment to build seven large tools now. The reference course should expose
which capability must exist next and how native it needs to be.
