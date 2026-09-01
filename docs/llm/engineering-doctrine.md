# Long-Horizon Engineering Doctrine

> Audience: LLM collaborators
> Human counterpart: [Engineering Doctrine](../human/engineering-doctrine.md)
> Role: rigorous long-horizon decision and sovereignty policy

## Purpose

This document defines how Machines should make engineering decisions when the
project is expected to evolve over decades and when depth, coherence, and
educational quality matter more than rapid completion.

It expands the compact [engineering philosophy](philosophy.md) into an
operational doctrine. It constrains architecture, research, authoring tools,
runtime systems, pedagogical intelligence, and the evolution of the course
factory.

## Time horizon

Machines is planned as a long-lived engineering and research project.

Economic outcomes, available resources, and release opportunities can affect
the order and scale of work. They do not by themselves define the mission or
the quality ceiling.

Rapid implementation can be useful when it produces evidence. It is not the
governing objective. A fast experiment and a durable foundation are different
artifacts and must be identified as such.

Planning should use evidence horizons rather than fictional long-range dates:

| Horizon | Governing concern |
| --- | --- |
| Enduring | Mission, learner promise, reviewed domain understanding, and ethical constraints. |
| Research | Questions whose answers can change the product or architecture. |
| Architectural | Capabilities and semantic boundaries that may span many generations. |
| Experimental | The next complete system slice that can produce decisive evidence. |
| Immediate | The concrete question being investigated or implemented now. |

The enduring horizon gives direction. Immediate work produces evidence. That
evidence is allowed to revise the research and architectural horizons.

## What depth means

Depth is a multidimensional engineering property.

### Epistemic depth

The project can explain what it believes, why it believes it, which evidence
supports it, what remains uncertain, and what would change the conclusion.

### Semantic depth

The system represents the concepts that matter to Machines directly. It does
not force the domain to masquerade as generic documents, meshes, game objects,
chat messages, or database rows without preserving their Machines-specific
meaning.

### Integrative depth

Knowledge, representations, courses, tutor behavior, validation, runtime state,
and learner observations participate in a shared semantic reality. A meaningful
change can propagate to every affected artifact and test.

### Evaluative depth

Claims about correctness, usability, pedagogy, performance, and understanding
are connected to explicit evaluation methods rather than intuition alone.

### Temporal depth

The project preserves provenance, versions, migrations, decisions, and research
history so that future work can understand and revise past work without losing
its reasoning.

### Experiential depth

The resulting course feels native to the Machine being studied and to the
pedagogy of construction. The experience is not merely a generic tool with a
Machines visual layer.

Depth is not synonymous with size, novelty, low-level implementation, or the
number of features. Reimplementing a generic system without changing its
assumptions can be expensive and still remain shallow.

## Technical sovereignty

Every layer that materially determines what a Machine is, how it is
represented, how it is assembled, how it is explained, or how understanding is
evaluated is a candidate for Machines-native ownership.

Ownership means more than operating a service or possessing source code. For a
critical capability, the project should seek control over:

- domain semantics;
- behavioral contracts;
- canonical data and provenance;
- evaluation suites and acceptance criteria;
- evolution and migration paths;
- training data and learning objectives when models are involved;
- operational observability;
- exit and replacement capability;
- the roadmap that determines what the capability can become.

The boundary of sovereignty can move deeper as the project learns. No current
dependency is presumed to be the permanent conceptual boundary of the project.
At the same time, replacing a dependency should be justified by the additional
semantic control, quality, or research capability that the native system makes
possible.

## External technology classifications

External technology is not treated as one undifferentiated category. Every
material external capability should be classified by its present role.

| Classification | Permitted role | Intended semantic authority | Required discipline |
| --- | --- | --- | --- |
| Research instrument | Helps inspect a problem or compare hypotheses. | None; containment must be verified. | Preserve observations independently and test that the instrument does not become the only interpretable record. |
| Temporary scaffold | Makes an experiment executable before a native capability exists. | None; containment must be verified. | Mark the boundary, prevent format lock-in, record replacement pressure, and exercise recovery. |
| Reference implementation | Provides behavior against which native work can be compared. | None; its behavior is evidence, not authority. | Define which behavior is useful, which assumptions are rejected, and how comparison is reproduced. |
| Provisional dependency | Supports real work while its long-term status remains open. | Limited by an explicit adapter and contract. | Track risks, exit cost, substitutability, and influence on outcomes. |
| Native component | Embodies Machines semantics and is governed by the project. | Explicit, scoped, and evidenced. | Maintain contracts, tests, migrations, dependency transparency, and research rationale. |

Using an external tool during research does not make that tool the destination.
Rejecting it as a permanent foundation does not require reproducing all of its
generic features. Machines should build the narrower system that expresses its
own problem more truthfully.

## Native maturity assessment

`Native` is not granted by naming, repository ownership, or an outer API. A
capability records its maturity across independent dimensions:

| Dimension | Qualification question |
| --- | --- |
| Semantic | Does Machines define the concepts, identities, and invariants that matter? |
| Behavioral | Can the project specify, inspect, test, and change the behavior that affects the result? |
| Evaluative | Does the project control the acceptance criteria, datasets, baselines, and regression suites? |
| Data and provenance | Can canonical records, lineage, and evaluation history be recovered without the dependency? |
| Evolutionary | Can formats, behavior, and persisted work migrate under a project-controlled roadmap? |
| Operational | Can the capability be observed, reproduced within its contract, replaced, and recovered? |
| Dependency | Are material models, services, formats, licenses, datasets, runtimes, and transitive dependencies classified recursively? |
| Rights | Does the project control the rights needed to retain, study, modify, migrate, and operate the relevant artifacts? |

A component can be native in some dimensions and provisional in others. Its
documentation should state that profile instead of collapsing it into one
marketing label.

A native-maturity review should include an exit exercise appropriate to the
capability. The exercise demonstrates recovery of canonical records,
provenance, evaluation history, and build interpretation without the external
system. When behavioral compatibility matters, it compares the recovered
behavior under declared tolerances and records what cannot yet be reproduced.

Owning a wrapper around an unclassified model, service, file format, or runtime
does not satisfy native maturity. The material subdependencies and the behavior
they control remain part of the sovereignty assessment.

## Native systems, not generic clones

### Semantic representation instead of a generic modeling clone

A Machines-native representation tool should understand component identity, function,
containment, connections, relations, assembly states, explanatory importance,
evidence, and levels of educational detail. Geometry is one manifestation of
that semantic model.

The long-term objective is not feature parity with a general three-dimensional
editor. It is superior authorship of machine explanations: meaningful cutaways,
exploded states, connection constraints, causal overlays, focus views,
alternative representations, and verified simplifications.

### A learning runtime instead of a generic game-engine wrapper

A Machines-native runtime should be organized around Machine state, assembly state,
presented-knowledge scope, observable learner history, bounded learner-model
hypotheses, prediction, feedback, camera intent, explanation, and tutor context.
Rendering and input backends can evolve beneath those concepts without becoming
their semantic authority.

[Decision 0003](../decisions/0003-machines-native-engine-foundation.md)
establishes a Machines-native engine as the production foundation. Unity,
Unreal, Godot, and equivalent generic game engines are not candidate product
foundations merely because they already provide rendering, scene editing,
meshes, shapes, rays, animation, physics, input, or platform export. Their scene
and game abstractions, editor boundaries, unused capability surface, extension
ceilings, and external roadmap would remain architectural constraints.

The native engine is not a reduced clone of those products. Its public surface
should expose Machines concepts and authoring operations directly. Graphics and
spatial facilities remain subordinate services: they realize representations
and interactions but do not own Machine identity, Course state, assembly logic,
learner evidence, or tutor context.

Lower-level technologies can remain beneath project-controlled contracts. They
must be classified recursively, prevented from acquiring canonical authority,
tested under declared tolerances, and given an exit path. The project should
internalize a lower layer when doing so materially expands Machines-specific
expression, integration, evaluability, or control—not merely to increase the
amount of custom code.

### Pedagogical intelligence instead of a generic chat wrapper

The tutor should become a project-controlled research program. Its identity
depends on grounded course state, verified knowledge, pedagogical policy,
training evidence, evaluation suites, memory boundaries, inference behavior,
and a characteristic way of helping a learner observe and reason.

Distillation, continued training, specialized models, composed systems, and
neuro-symbolic methods are hypotheses to investigate. Possessing model weights
alone would not prove that the tutor is native. The decisive question is whether
Machines can specify, constrain, observe, and evaluate the intelligence's
educational behavior under declared scenarios, tolerances, uncertainty, and
failure criteria.

## Semantic cohesion

Deep integration is not equivalent to connecting unrelated applications with
APIs. Transport is necessary, but semantic integration requires shared identity,
meaning, provenance, versioning, and invalidation rules.

All authoring and runtime capabilities should operate on or derive from the
same canonical model. For example, a change to a component can affect:

- its visual representations;
- connection and animation definitions;
- assembly steps;
- explanations and checks;
- supporting evidence;
- tutor context and evaluations;
- compiled course packages;
- published versions that require review.

The architecture must make those consequences discoverable rather than relying
on individual memory.

## Research before generalization

The first complete course is a reference course and an experimental instrument.
Its limited scope makes deep observation possible; it does not lower the quality
ambition.

The authoritative generation and evidence sequence lives in the
[reference-course evidence program](research-program.md#reference-course-evidence-program).
Its governing rule is that abstractions are promoted only after complete course
work exposes their meaning, limits, and repeated value. This is an epistemic
strategy, not a speed strategy.

## Durability requirements

Long-lived systems should make change safe and intelligible. Critical formats
and modules should eventually support:

- explicit schemas and stable identities;
- versioned contracts;
- provenance and derivation records;
- semantic diffs;
- migration tools;
- validation before publication;
- reproducible or explainably variable builds;
- replacement of provisional dependencies;
- archival access to published course versions;
- impact analysis and selective revalidation;
- export from transient operational systems into project-controlled records.

Durability does not mean freezing the first design. It means preserving enough
meaning and evidence to evolve deliberately.

## Decision discipline

A consequential decision should answer:

1. What problem or research question is being addressed?
2. Which domain assertion, model, or learner outcome is affected?
3. What evidence currently exists?
4. Which assumptions remain unverified?
5. What alternatives were considered?
6. Which semantic authority changes?
7. Which future options become easier or harder?
8. How reversible is the decision?
9. How will the result be evaluated?
10. What conditions would cause replacement or reconsideration?

The depth of the record should be proportional to the consequence of the
decision. Small, local, reversible choices do not require institutional
ceremony. Decisions that shape canonical formats, intelligence, authoring,
learner data, or published-course compatibility deserve durable records.

## Claim discipline

Documentation and implementation records should distinguish:

| Claim type | Meaning |
| --- | --- |
| Invariant | A domain or safety rule intended to remain true across implementations. |
| Policy | A current normative choice that can be revised deliberately. |
| Decision | An adopted choice with recorded context and consequences. |
| Hypothesis | A falsifiable belief awaiting sufficient evidence. |
| Observation | A recorded result from a defined context. |
| Validated result | A result that met declared criteria within a stated scope. |
| Aspiration | A direction or desired capability not yet demonstrated. |

Absolute language should be reserved for genuine invariants and explicit safety
boundaries. Terms such as `native`, `understood`, `better`, `deterministic`,
`reproducible`, and `validated` require a defined scope and evidence.

Determinism in particular must be specified per contract. A course state
transition can require replayable behavior while rendering, search, or
generative intelligence follows a different reproducibility contract. A local
guarantee should not silently become a system-wide claim.

## Quality definition

The best result is not defined by technical sophistication alone. A capability
is valuable when it improves one or more of the following without silently
damaging the others:

- truthfulness of the Machine explanation;
- depth and transfer of learner understanding;
- clarity and purpose of interaction;
- consistency between knowledge, representation, tutor, and runtime;
- author ability to reason about and revise a course;
- quality of evidence and validation;
- distinctiveness of the project experience;
- durability and evolvability of the system;
- capacity for future courses to go deeper where their goals require it.

## Failure patterns to resist

The project should actively detect:

- a generic tool becoming semantic authority by convenience;
- a wrapper being presented as a native system;
- isolated tools exchanging files without shared meaning;
- premature abstraction from hypothetical courses;
- low-level implementation pursued without a project-specific educational or
  research benefit;
- speed being mistaken for validated progress;
- feature volume being mistaken for depth;
- research hypotheses being documented as settled facts;
- an irreversible dependency being introduced without an exit analysis;
- learner completion being treated as proof of understanding.

## Relationship to other documents

- The [vision](vision.md) defines the learner promise this doctrine protects.
- The [conceptual model](concepts.md) defines the domain semantics the
  architecture must preserve.
- The [course pipeline](course-pipeline.md) supplies the production evidence and
  quality gates that the tools must support.
- The [research program](research-program.md) turns open questions into durable
  investigations.
- The [architecture](architecture.md) assigns authority and information flow.
- The [course factory](course-factory.md) applies the doctrine to authoring,
  validation, publication, and maintenance.
