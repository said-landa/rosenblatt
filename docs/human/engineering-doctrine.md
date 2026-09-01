# Long-Horizon Engineering Doctrine

> Detailed counterpart: [LLM engineering doctrine](../llm/engineering-doctrine.md)

Machines is planned for decades. Speed can help produce evidence, but it does
not set the mission or quality ceiling.

## What depth means

Depth must improve at least one meaningful dimension:

- confidence in what is true;
- direct expression of Machines concepts;
- cohesion between systems;
- ability to evaluate quality;
- preservation of history and reasoning;
- quality of the learner's experience.

Reimplementing a generic tool without changing its assumptions can be costly
and still shallow.

## External technology roles

Every material external capability is classified as:

1. research instrument;
2. temporary scaffold;
3. reference implementation;
4. provisional dependency;
5. native component.

Its role, semantic authority, risks, and exit path must be explicit.

## Native maturity

Native maturity includes control over semantics, behavior, evaluation, data and
provenance, evolution, operations, dependencies, and rights. Owning a wrapper
or repository is not sufficient.

## Machines-native engine

Machines will build its own engine rather than place the product on Unity or
another generic game engine. Rendering, geometry, meshes, shapes, rays,
animation, and input serve Machine and Course semantics; they do not define
them.

The goal is not to clone a general engine. It is to own the narrower, deeper
engine, authoring interface, behavior, and roadmap that the intended experience
requires. Lower-level technology can remain bounded and replaceable beneath
Machines-controlled contracts.

This fixes the destination, not the final architecture. Complete Course work
will reveal the minimum native vertical engine and the order in which its
capabilities should be built. See [Decision 0003](../decisions/0003-machines-native-engine-foundation.md).

## Decision test

Before investing deeply, ask:

- What uniquely Machines capability becomes possible?
- What evidence shows the current boundary is limiting quality or learning?
- Which concept, behavior, or data becomes project-controlled?
- How will the result be evaluated?
- What simpler experiment can test the premise first?
- What will make us stop, revise, or replace the work?
