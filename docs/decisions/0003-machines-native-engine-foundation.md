# 0003 — Machines-Native Engine Foundation

- Status: Accepted
- Date: 2026-08-24
- Decided by: Creator

## Decision

Machines will design and build its own domain-native engine. Unity, Unreal,
Godot, and other generic game engines will not become the production engine,
authoring foundation, runtime ontology, or semantic authority of the project.

The engine will be shaped around the capabilities Machines actually needs,
including:

- Machine, Component, Relation, and Assembly State identity;
- semantic selection, inspection, placement, connection, and constraint;
- educational representations, cutaways, exploded states, overlays, and
  controlled simplification;
- camera intent, animation, effects, interaction, and direct authoring;
- rendering, shapes, geometry, meshes, materials, rays, picking, and spatial
  queries as subordinate visual and computational capabilities;
- compilation, validation, tutor context, observations, progress, replay, and
  accessibility bound to the same semantic source.

Machines will control the engine's architecture, interfaces, behavioral
contracts, evaluation, evolution, and roadmap. Its integration with the Course
Factory, Course Compiler, authoring workspaces, tutor, evidence, and runtime
will be semantic and direct rather than an exchange of flattened assets and
scripts between unrelated systems.

## Boundary of native ownership

Building a Machines-native engine does not imply rebuilding hardware, operating
systems, graphics drivers, or every mathematical and media primitive.
Lower-level external technology may be used when it:

- sits beneath a Machines-controlled contract;
- does not impose a generic game ontology on canonical source;
- can be replaced without redefining a Machine, Course, or learner action;
- has an explicit classification, dependency boundary, evaluation, and exit
  path;
- does not control the engine's authoring interface or product roadmap.

Graphics APIs, shader toolchains, codecs, numerical libraries, and similar
primitives are therefore candidates for bounded dependencies. A generic game
engine may be studied or benchmarked as a reference implementation, but it may
not host canonical Course behavior or become the production foundation without
a superseding decision.

## Why this decision is needed

Generic game engines are primarily organized around the needs and abstractions
of broad 2D and 3D game production. Even when they provide useful rendering,
mesh, shape, ray, animation, or editor features, they bring large capability
surfaces and technical assumptions that Machines may not need.

More importantly, their extension points and roadmaps bound how deeply Machines
can shape machine-specific semantics, authoring, interaction, pedagogy,
validation, and system-wide propagation. A plugin or visual wrapper would still
leave a general engine beneath the project and would not provide the desired
control or intimate connection with the rest of the system.

The cost of native construction is accepted because the intended result is not
a conventional game. The engine itself is a core research and product
capability.

## Alternatives considered

### Adopt a generic game engine and add Machines plugins

Rejected because the generic scene, object, editor, lifecycle, and roadmap
would remain the underlying authority. Deep integration would be limited by an
engine designed for a different problem.

### Fork an existing general engine

Rejected as the default direction because Machines would inherit a large,
unneeded architecture and an ongoing burden of understanding, removing, and
adapting assumptions before reaching its own domain.

### Use a generic engine as the primary temporary scaffold

Rejected because early Course and authoring evidence could become distorted by
the scaffold's ontology, and migration could require rebuilding behavior that
should have been specified natively. Narrow isolated experiments remain
possible when explicitly classified as research instruments or reference
comparisons.

### Build every technical layer from first principles immediately

Rejected because native ownership is about control of the meaningful engine
boundary, not symbolic reimplementation. Depth must earn its place through
Machines-specific capability, evidence, or sovereignty.

## Consequences

- The permanent product direction is a Machines-native engine, not a game-engine
  wrapper.
- Engine primitives will be discovered through complete Course work and
  promoted only with evidence.
- Canonical Machine and Course semantics remain outside graphics backends and
  lower-level dependencies.
- The authoring interface is part of the engine contract and will be designed
  for the creator's exact workflow.
- Every material dependency below the engine receives a classification,
  containment boundary, and replacement analysis.
- Rendering breadth or conventional game features are added only when a
  Machines use case requires them.
- Engine evaluation must include semantic correctness, authoring power,
  experiential quality, performance, accessibility, reproducibility, and
  integration—not only frame rendering.

## Evidence and uncertainty

The destination and sovereignty boundary are accepted. The exact internal
architecture, graphics backend, geometry kernel, execution model, device
targets, and order of capability development remain research questions.

The reference Course must reveal which engine capabilities are essential,
which should be native first, and where a lower-level dependency preserves
control without limiting the intended result.

## Reversibility and revisit triggers

This decision can be superseded only through another explicit decision record.
Difficulty, schedule pressure, or the existence of a convenient generic feature
are not sufficient by themselves.

Revisit the exact boundary when evidence shows that:

- a lower-level dependency controls learner-visible behavior that Machines
  cannot adequately specify, evaluate, or replace;
- native implementation at a particular layer adds no meaningful control,
  quality, integration, or research capability;
- a target platform makes the current boundary unable to meet the declared
  learner experience or authoring standard;
- the engine's own abstractions begin reproducing generic game assumptions
  instead of expressing Machines directly.

## Resulting next action

Select the reference Course and exact primary Machine variant. Build its
complete low-fidelity path, then derive a minimum vertical engine capability map
from that path before selecting the first internal engine architecture.
