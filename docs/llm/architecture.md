# Architecture

> Audience: LLM collaborators
> Human counterpart: [Architecture](../human/architecture.md)
> Role: rigorous semantic authorities, system boundaries, derivation, and
> validation contracts

## Purpose and status

This document defines the current architectural direction for Machines. It
turns the [conceptual model](concepts.md), the
[course pipeline](course-pipeline.md), and the
[long-horizon engineering doctrine](engineering-doctrine.md) into candidate
system boundaries, semantic authorities, information flows, and validation
contracts.

The architecture is a planning contract, not an implementation report. Module
names and physical deployment boundaries remain hypotheses until a reference
course and native vertical systems provide evidence. The semantic distinctions
and quality responsibilities described here are intended to make those
experiments coherent.

## Architectural thesis

Machines is not only a learner application and not only a collection of
courses. It is a vertically integrated system for researching, authoring,
compiling, validating, executing, observing, and evolving machine-understanding
experiences.

The architecture is governed by five propositions:

1. **One semantic reality, many projections.** Research, authoring, compilation,
   runtime, tutoring, validation, and observation refer to the same stable
   entities and revisions.
2. **Machine meaning precedes representation.** A component is not a mesh, a
   scene object, a file, or a screen element. Representations derive meaning
   from the component and its relations.
3. **Publishable behavior becomes declared and versioned.** Early research can
   use explicit custom behavior to discover missing language and runtime
   capabilities. Behavior that survives into a release must be represented in
   versioned course source or in an explicit versioned native capability rather
   than hidden in one-off runtime code.
4. **Intelligence is grounded and evaluated.** Pedagogical intelligence acts
   from structured course state, project-controlled knowledge, behavioral
   contracts, and explicit evaluations.
5. **Observations return to their causes.** Runtime evidence remains connected
   to the release, course intent, semantic entities, and pipeline stage that can
   address the finding.

## Current reference-course requirements

The first architecture must support:

- recursive component decomposition without requiring every course to use the
  deepest available level;
- explicit functions and relations, not only visual containment;
- evidence-backed knowledge and declared uncertainty;
- multiple educational representations of one semantic Machine;
- complete low-fidelity courses before expensive production;
- deliberate learning sequences and observable objectives;
- semantic assembly rather than unconstrained scene interaction;
- a tutor situated in exact course and runtime state, observable learner
  history, and explicitly bounded learner-model hypotheses;
- progress without equating completion with understanding;
- traceable validation, publication, maintenance, and revalidation;
- progressive technical sovereignty over every identity-defining layer.

## Long-horizon non-foreclosure goals

The architecture should avoid assumptions that unnecessarily prevent later
support for:

- physical, logical, biological, digital, and hybrid machines;
- multiple forms of causality, flow, behavior, and representation;
- different learner populations, languages, devices, and accessibility needs;
- decades of schema, runtime, representation, and intelligence evolution;
- deeper native implementation where research establishes material value.

These are non-foreclosure goals, not requirements for the first implementation.
Each new domain must challenge the architecture through a concrete course and
evidence rather than speculative generalization.

## System planes

Machines is organized conceptually into three coupled planes.

The Course Factory spans the authoring and research plane, the compilation and
validation plane, and the release and maintenance work that consumes evidence
from execution. The Machines Runtime remains a distinct execution system shared
by preview, pilot, and published use.

### Authoring and research plane

This plane curates evidence, records reviewed assertions and modeling decisions,
models Machines, designs learning, authors representations and interactions,
prepares pedagogical intelligence, and reviews course quality.

Its human-facing work can be exposed through a **Course Studio** and its
workspaces, described in [course-factory.md](course-factory.md).

### Compilation and validation plane

This plane resolves canonical source revisions, applies semantic and
pedagogical validators, derives runtime artifacts, executes evaluations, and
produces immutable course builds.

It prevents the runtime from repairing missing semantics through hidden
course-specific behavior.

### Execution and observation plane

This plane runs the compiled course, maintains the active session, progress, and
assembly state, provides pedagogical assistance, records observable learner
history, and returns evidence to the factory and research program. Any learner
model remains a bounded interpretation rather than direct access to internal
understanding.

Preview, pilot, and published execution should share the same runtime semantics
so that validation evidence remains applicable.

## System context

```text
                    Sources and expert review
                              |
                              v
                   Evidence and Knowledge
                              |
                              v
                  Machines Semantic Substrate
                 /            |               \
                /             |                \
        Machine Model      Course Source   Progress & Observation
                \             |                /
                 \            |               /
                  +--- Course Studio views ---+
                              |
                              v
                       Course Compiler
                              |
                       immutable CourseBuild
                              |
               +--------------+---------------+
               |                              |
               v                              v
      Build and Preview                Release Registry
               |                              |
               +--------------+---------------+
                              |
                              v
                      Machines Runtime
                       /             \
                      /               \
       Pedagogical Intelligence     Learner Observations
                      \               /
                       \             /
                        Research Memory
                              |
                              v
                    evidence-guided revision
```

This diagram shows semantic flow, not a required process topology. A future
implementation can use multiple stores, processes, devices, and languages while
preserving one canonical identity and authority model.

## Core terminology

The following terms separate systems that can otherwise become conflated.

| Term | Meaning |
| --- | --- |
| Course Factory | The complete sociotechnical system that researches, authors, validates, publishes, and improves courses. |
| Course Studio | A candidate internal application shell through which people access factory workspaces. |
| Workspace | A specialized projection of shared semantic source for a coherent kind of work. |
| Machines Semantic Substrate | The versioned identities, types, relations, provenance, and dependency rules shared across the lifecycle. |
| Machines Language | A candidate future language for authoring and executing Machines-specific semantics over the substrate. |
| Course Source | The canonical authored definition of one course revision. |
| Course Compiler | The native system that validates source and derives an executable package. |
| Course Build | An immutable compiled result from exact source and toolchain identities. |
| Course Release | An approved, recoverable build plus compatibility, validation, exposure, and maintenance records. |
| Execution Identity | The exact build, runtime, tutor, representation, policy, environment, and deployment configuration under which a session runs. |
| Course Progress | Durable observable completion and resume state for one learner and course, without a claim of comprehension. |
| Observation Record | An append-oriented record of an event that occurred under an exact execution identity and semantic context. |
| Learning Interpretation | A versioned, bounded inference from observations, with method, scope, uncertainty, and alternatives. |
| Machines Runtime | The learner-facing execution kernel for Machines assembly, pedagogy, progress, and observation. |
| Pedagogical Intelligence | The complete project-controlled system that observes context and proposes pedagogical action. |
| Tutor | The learner-facing presence produced through pedagogical intelligence and runtime policy. |
| Representation | A semantic way to make a Machine entity or relation perceptible for an educational purpose. |
| Derived asset | A generated or imported artifact used to realize a representation in a particular build. |

`Machines Language` remains a research direction. The architecture should not
prematurely collapse ontology, storage, interchange formats, editing commands,
and executable language into one artifact merely because they share concepts.

## Machines Semantic Substrate

The semantic substrate is the shared foundation beneath every workspace and
runtime capability. It is not necessarily one database. It is the coherent set
of contracts that preserve identity and meaning across storage and execution
boundaries.

### Connected models

The substrate contains connected submodels.

#### Governance model

Represents course proposals, lifecycle states, risks, capability gaps,
responsibilities, reviews, quality gates, approvals, accepted risks, and
decisions.

#### Evidence model

Represents claims, sources, scope, authority, conflicts, uncertainty, expert
review, simplification rationale, and provenance.

#### Machine model

Represents Machine variants, boundaries, recursive components, functions,
materials, relations, flows, states, transformations, and explicitly omitted
detail.

#### Knowledge model

Represents concepts, prerequisites, evidence-backed explanatory treatments at
different depths, misconceptions, transfer opportunities, and their connections
to Machine entities and evidence.

An `ExplanatoryTreatment` describes reviewed explanatory structure or strategy
for a concept, component, or relation at a declared depth. It is not yet the
wording shown at one moment in a course.

#### Terminology model

Represents versioned technical terms, learner-facing labels, aliases,
definitions, locale, depth, scope, pronunciation where relevant, links to
components, concepts and claims, and prohibited or ambiguous uses.

Terminology is shared by research, authored content, accessibility,
localization, runtime labels, search, and pedagogical intelligence.

#### Course model

Represents `primary_machine_variant_id`, contextual or comparison Machine
references, learner assumptions, outcomes, chapters, lessons, assembly steps,
`CheckSpecification`, `SituatedExplanation`, `CheckRealization`, progression,
and completion criteria.

Every course has exactly one primary Machine variant. Contextual or comparison
Machines are explicitly typed and do not become additional primary assembly or
progress targets implicitly.

A `SituatedExplanation` realizes one or more reviewed explanatory treatments in
an exact course state. A `CheckSpecification` declares the reasoning evidence a
learning design needs; a `CheckRealization` defines the exact prompt,
interaction, feedback, and presentation used to collect that evidence.

#### Assembly model

Represents assembly states, transitions, available and visible components,
expected and allowed actions, connection constraints, errors, hints, reveals,
and completion conditions.

#### Representation model

Represents `RepresentationRequirement`, `ProductionItem`, reviewed visual and
interactive realizations, connection views, levels of detail, cuts,
transparency, animations, camera intentions, attention targets, geometric
sources, compiled render assets, and their educational purposes.

The production inventory derives requirements from the approved prototype and
assembly script and tracks owner, status, reuse decision, review evidence, and
realization coverage.

#### Tutor model

Represents context projections, allowed knowledge, pedagogical strategies,
memory boundaries, behavior specifications, datasets, model identities, and
evaluation cases.

#### Learner identity and progress model

Represents policy-scoped learner identity, durable `CourseProgress`, compatible
resume checkpoints, completion records, and progress migrations. Progress
records observable course facts; it does not assert comprehension.

#### Session-state model

Represents mutable `LearnerSessionState` for one execution: active course state,
assembly state, presented concepts, recent actions, and loaded progress
checkpoint.

#### Observation model

Represents append-oriented `ObservationRecord` entries for actions, answers,
explanations, help requests, tutor interactions, pilot notes, and runtime
conditions under an exact Execution Identity.

#### Learning-interpretation model

Represents versioned `LearningInterpretation` records derived from declared
observation sets. Each interpretation records its method, scope, uncertainty,
alternative explanations, and review status.

#### Build and release model

Represents source revisions, compiler and validator versions, derived artifacts,
builds, validation runs, defects, `ExecutionIdentity`, `PilotDeployment`,
approvals, releases, compatibility, and maintenance changes.

### Logical and revision identity

A durable entity needs both logical identity and revision identity. A
`Component`, for example, can be researched, used in a lesson, rendered in
several ways, selected at runtime, discussed by the tutor, and observed in a
pilot through one logical identity. Every exact historical state of that
component has a separate immutable revision identity.

A correction can preserve logical identity when the project still intends to
refer to the same Machine entity. A discovered split, merge, replacement, or
scope incompatibility can require new logical identities plus explicit
`replaces`, `split_from`, `merged_from`, or deprecation relationships. The
authority responsible for the entity records that decision and its rationale;
identifier reuse does not decide it implicitly.

References must declare whether they follow the latest compatible revision of a
logical entity or bind to an exact revision. Builds and releases bind to exact
revisions. Authoring views can follow logical identities while showing revision
and compatibility state.

Candidate stable identities include:

- `Machines_id` and `Machines_variant_id`;
- `component_id` and `relation_id`;
- `claim_id`, `source_id`, `concept_id`, and `term_id`;
- `course_id`, `chapter_id`, `lesson_id`, and `step_id`;
- `assembly_state_id` and `representation_id`;
- `representation_requirement_id`, `production_item_id`, and
  `prototype_session_id`;
- `explanatory_treatment_id`, `situated_explanation_id`,
  `check_specification_id`, and `check_realization_id`;
- `content_review_id` and `pilot_deployment_id`;
- `tutor_spec_id` and `tutor_evaluation_id`;
- `source_revision_id`, `build_id`, `execution_id`, and `release_id`;
- `learner_id`, `progress_id`, `session_id`, and `safe_resume_revision_id`;
- `validation_run_id`, `observation_id`, `interpretation_id`, and
  `change_set_id`.

The exact identifier system remains an implementation decision. Its contract
must support durable references, immutable revision identity, versioned meaning,
identity splits and merges, compatibility, deprecation, and impact analysis.

### Canonical, authored, and derived information

The architecture distinguishes:

- **canonical semantic source:** authoritative records of identities, scoped
  claims, relations, intent, reviewed assertions, and modeling decisions;
- **authored projections:** workspace-specific views and commands over canonical
  source;
- **derived artifacts:** compiler output, indexes, optimized geometry, runtime
  packages, tutor context projections, and reports;
- **observations:** immutable or append-oriented records of what occurred in a
  declared context;
- **interpretations:** bounded conclusions derived from observations, with
  method and uncertainty.

Derived artifacts can be regenerated within their declared reproducibility
contract. They do not become the only surviving carrier of canonical meaning.

### Commands and projections

Workspaces should not exchange flattened exports and later attempt to reconstruct
meaning. Each workspace reads a controlled projection and submits typed commands
against the semantic authority responsible for the change.

A command should identify:

- the entity and source revision being changed;
- the intended semantic operation;
- the author or process proposing it;
- supporting rationale or evidence when required;
- expected preconditions;
- affected quality status;
- resulting revision and invalidation set.

This model permits different interfaces and storage systems without allowing
workspace boundaries to create contradictory realities.

## Semantic authorities

Each class of canonical record and modeling decision has one authority. An
authority governs identity, review state, revision, and accepted use; it does
not convert a contested claim into universal truth. Competing claims can coexist
when their source, scope, uncertainty, and review status remain explicit.

Other systems can consume authoritative records, propose changes, and report
defects, but should not redefine those records silently.

| Logical authority | Owns | Does not own |
| --- | --- | --- |
| Governance | Lifecycle state, gates, approvals, risk acceptance, and responsibility. | Domain assertions or runtime behavior. |
| Evidence and Knowledge | Claims, sources, uncertainty, concepts, prerequisites, and reviewed explanatory treatments. | Course ordering, situated wording, or visual realization. |
| Terminology | Versioned terms, aliases, locale-specific labels, definitions, scope, and ambiguity rules. | Independent domain assertions or course ordering. |
| Machine Model | Machine boundary, component identity, function, relation, flow, and semantic state. | A particular mesh or lesson sequence. |
| Course Source | Primary Machine binding, learning outcomes, sequence, situated explanations, check specifications and realizations, and selected knowledge scope. | Independent domain assertions. |
| Assembly Model | Semantic assembly state, transitions, constraints, mistakes, and completion conditions. | Generic physics or arbitrary scene behavior. |
| Representation Model | Production requirements, educational representation intent, realizations, and bindings to Machine and Course semantics. | Component identity or unsupported function. |
| Pedagogical Intelligence | Pedagogical strategies, evaluated behavior, model lineage, and structured proposals. | Machine records, authoritative Course state, or unilateral learner-model mutation. |
| Course Compiler | Validation, dependency closure, derivation, diagnostics, and build identity. | Hidden repair of incomplete source. |
| Learner Identity and Progress | Policy-scoped learner identity, durable Course Progress, safe-resume checkpoints, and progress migration. | Claims about internal understanding. |
| Runtime | Authoritative active session and assembly state plus validated progress-update commands. | Authored domain assertions, unilateral progress rewriting, or proof of comprehension. |
| Observation Ledger | Append-oriented records of what occurred under an exact Execution Identity and semantic context. | Interpretation of understanding or silent course revision. |
| Research and Interpretation | Versioned bounded interpretations, study methods, uncertainty, and alternative explanations. | Mutation of raw observations or authored Course and Machine records. |
| Release Registry | Approved immutable release identity, compatibility, exposure, recovery, and maintenance responsibility. | Mutable authoring source. |

These are logical authorities, not mandatory services. Physical decomposition
should follow measured operational and development needs while preserving the
authority contracts.

## Native authoring and research plane

Within the Course Factory, Course Studio and its automated collaborators provide
the environment for creating and improving canonical source. Its workspaces are
defined in [course-factory.md](course-factory.md).

The factory should support:

- semantic editing rather than disconnected file management;
- provenance-preserving human and machine assistance;
- review at the entity and relationship level;
- branching, comparison, and controlled merge of course revisions;
- impact analysis before consequential change;
- quality-gate orchestration;
- navigation from a runtime finding to its likely upstream cause;
- reuse with applicability review;
- native previews over the reference runtime;
- visible distinction between authored, proposed, derived, validated, and
  published information.

Automation and generative intelligence can propose changes. Their proposals
must preserve provenance, uncertainty, and review state. Automation does not
gain semantic authority merely by producing plausible output.

## Native semantic representation system

Machines requires a representation system born from machine and learning
domains rather than from a generic mesh or scene ontology.

### Native concerns

- component and relation identity;
- functional and assembly constraints;
- multiple representations per semantic entity;
- educational levels of detail;
- meaningful cutaways, exploded states, transparency, and isolation;
- causal and flow overlays;
- semantic selection and connection targets;
- animation and camera intent;
- visual legibility and accessibility;
- derivation from evidence and Machine structure;
- validation against the intended explanation.

### Separation of authorities

A representation describes how meaning becomes perceptible. A derived asset is
a build-specific realization. Replacing a geometry algorithm, renderer, file
encoding, or device backend should not change the identity or function of the
component being shown.

This separation creates space for a native geometry kernel, native authoring
interactions, procedural representations, and native rendering research without
making early technical choices the permanent ontology.

## Native Course Compiler

The compiler turns an exact Course Source revision into a Course Build. It is a
semantic compiler, not only an asset bundler.

### Candidate compilation stages

1. Resolve stable identities and revision dependencies.
2. Validate evidence, Machine, knowledge, and terminology references.
3. Require exactly one `primary_machine_variant_id`; validate contextual and
   comparison-Machine roles.
4. Validate course structure, objectives, prerequisites, and coverage.
5. Construct and validate the assembly state graph.
6. Verify that every production requirement has a reviewed representation
   realization and that geometric sources remain bound to semantic intent.
7. Resolve camera intentions, interactions, situated explanations, and check
   realizations; verify that each check collects the evidence declared by its
   `CheckSpecification`.
8. Derive tutor context projections and bind evaluation suites.
9. Validate progress, resumption, completion, and accessibility contracts.
10. Detect missing references, orphans, unreachable states, and undeclared
   course-specific behavior.
11. Derive runtime assets and optimized indexes.
12. Execute required static, runtime, visual, content, and tutor validations.
13. Produce an immutable build manifest and diagnostics.

Compilation failure should point to the semantic entity, source revision,
pipeline stage, violated invariant or policy, and likely correction workspace.

The compiler can offer explicit, reviewable transformations. It should not hide
missing domain or pedagogical decisions inside generated runtime logic.

## Build and preview

Build & Preview is the diagnostic environment around the compiler and reference
runtime.

It should provide:

- full and partial course builds;
- low-fidelity placeholders over real semantic source;
- inspection of resolved identities and dependencies;
- state-graph and prerequisite visualization;
- exact diagnostics and causal defect routing;
- tutor scenario replay;
- save, resume, error-route, and accessibility testing;
- visual comparison between source or build revisions;
- runtime-semantic parity with pilot and publication.

A preview that uses different course semantics from production can produce
misleading validation evidence even if it looks identical.

## Native Machines Runtime

The runtime is a machine-understanding runtime, not a game-engine ontology with
course metadata attached.

### Foundation constraint

The runtime and its authoring-facing engine are governed by
[Decision 0003](../decisions/0003-machines-native-engine-foundation.md). A
generic game engine cannot be the production host beneath these semantics.
Canonical execution cannot depend on exporting Machine and Course meaning into
generic scenes, objects, components, scripts, or editor metadata.

The engine may depend on bounded lower-level graphics, compute, media, math,
platform, or device capabilities. Those dependencies implement declared
contracts beneath the native boundary. They do not own canonical identities,
state transitions, authoring operations, validation policy, or the learner
experience roadmap.

This constraint fixes architectural authority, not premature implementation
detail. The reference Course and evidence program still determine the first
vertical capability set, backend experiments, and promotion of durable engine
contracts.

### Native runtime primitives

Candidate primitives include:

- `Machine`;
- `Component`;
- `Relation`;
- `AssemblyState`;
- `AssemblyStep`;
- `KnowledgeConcept`;
- `ExplanatoryTreatment`;
- `SituatedExplanation`;
- `LearningObjective`;
- `CheckSpecification`;
- `CheckRealization`;
- `CourseProgress`;
- `ObservationRecord`;
- `LearningInterpretation`;
- `Prediction`;
- `Misconception`;
- `CameraIntent`;
- `TutorContext`;
- `TutorProposal`.

These names are candidates until language and runtime research establishes
their exact types and responsibilities.

### Runtime responsibilities

The runtime should:

- execute assembly states and transitions;
- enforce semantic availability and connection constraints;
- render the intended representation for the current educational moment;
- collect predictions, selections, placements, explanations, and help requests;
- provide useful feedback for expected and mistaken actions;
- load compatible durable progress and create an exact session state;
- submit progress updates only through validated course-transition rules;
- create safe-resume checkpoints bound to compatible source and execution
  revisions;
- derive the exact bounded context available to the tutor;
- record observable events with Execution Identity and semantic identities;
- support replay or reconstruction where its contract requires it;
- expose accessibility alternatives for essential meaning and action.

### Reproducibility boundaries

Different runtime boundaries can require different guarantees. Assembly state
transitions and progress may require deterministic replay. Rendering can permit
declared numerical or perceptual tolerances. Pedagogical intelligence can be
stochastic while remaining versioned and evaluated.

Each contract must state its reproducibility scope. The architecture does not
make one universal same-input/same-output claim.

### Progress and session update rules

The Runtime owns mutable state only for the active session. Learner Identity and
Progress owns the durable `CourseProgress` record.

1. Runtime opens a `LearnerSessionState` from an exact Execution Identity and a
   compatible safe-resume revision.
2. A validated state transition emits an append-oriented observation and a
   typed progress-update command.
3. The Progress authority verifies learner, course, revision, ordering,
   idempotency, and migration preconditions before committing durable progress.
4. A session crash can be reconstructed from the latest committed checkpoint
   and the replay contract declared for that runtime generation.
5. Resuming under an incompatible course or runtime revision requires an
   explicit progress migration or continued execution under a compatible build.

Neither active session state nor durable progress is treated as direct evidence
of internal comprehension.

## Native pedagogical intelligence

Pedagogical Intelligence is a complete system, not a single model endpoint.

### Structured input

The runtime derives a versioned pedagogical frame containing, as appropriate:

- course, chapter, lesson, and step;
- current objective and allowed depth;
- assembly and progress state;
- visible, available, selected, and recently manipulated components;
- concepts presented and not yet presented;
- relevant claims, evidence, and uncertainty;
- recent observable actions, requests, assistance, and authored mistake
  classifications;
- bounded learner-model hypotheses with method and uncertainty, when policy
  permits their use;
- applicable terminology and learner-facing locale;
- learner-facing language and accessibility context;
- memory permitted by policy.

### Structured proposal

Pedagogical Intelligence should return more than unconstrained text. A candidate
proposal can contain:

- pedagogical intent;
- strategy such as ask, hint, contrast, explain, or defer;
- target component, relation, observation, or concept;
- evidence and knowledge used;
- confidence and uncertainty;
- proposed utterance or multimodal explanation;
- suggested runtime focus or representation action;
- expected learner response;
- safety and scope signals.

The runtime and policy boundary decides how a proposal affects the experience.
The intelligence does not directly rewrite Machine records, authoritative
course or session state, durable progress, observations, or learning
interpretations.

### Project-controlled program

Machines should seek control over:

- pedagogical objectives and behavior specifications;
- corpora, examples, counterexamples, and lineage;
- grounded context and memory contracts;
- evaluation and regression suites;
- identity, voice, and interaction patterns;
- model specialization and composition;
- inference architecture and observability;
- failure behavior and uncertainty;
- compatibility between tutor, course, runtime, and release versions.

Distillation is one candidate research path among several. Model ownership earns
architectural value by producing verified pedagogical behavior, not by changing the
label on a generic conversational system.

## Learner observation and learning evidence

The runtime records observable facts. Research and evaluation can derive
bounded interpretations, but progress and understanding remain distinct.

An observation should remain connected to:

- learner and session scope permitted by policy;
- exact Execution Identity, including build, runtime, tutor, representation,
  policy, environment, and deployment versions;
- `release_id` when the execution belongs to a published release;
- assembly state and semantic entities;
- expected learning objective and action;
- assistance and feedback shown;
- timing and device context where relevant;
- the authored intention being evaluated.

The Learning Observatory can detect repeated confusion, abandoned steps,
unexpected strategies, help patterns, explanation quality, or transfer evidence.
It should preserve the difference between measured events, qualitative notes,
statistical inferences, and educational conclusions.

### Execution Identity and pilot deployment

An `ExecutionIdentity` exists before publication. It binds the exact executable
conditions of a preview, validation run, pilot, or released session.

A `PilotDeployment` authorizes one or more Execution Identities for a defined
pilot protocol, population, environment, time window, and data policy. Stage-13
observations bind to the pilot deployment and execution identity; they do not
depend on a Course Release that stage 14 has not yet created.

When a build is published, the Course Release references its approved Execution
Identity or compatible identity set. Historical observations keep their
original execution identity even if a later release uses the same build.

## Release and maintenance

A Course Release identifies an immutable Course Build together with:

- approved Execution Identity or compatibility set;
- course, compiler, runtime, representation, tutor, and evaluation compatibility;
- technical, pedagogical, editorial, and accessibility approvals;
- accepted risks and known limitations;
- pilot evidence;
- exposure and withdrawal strategy;
- maintenance responsibility;
- recovery and archival information.

Published source is not mutated in place. A correction produces a new source
revision, impact set, validation result, build, and release relationship.

Maintenance begins at the earliest affected pipeline stage. The system computes
the downstream revalidation closure rather than assuming every edit has the
same consequence.

## Change propagation example

Consider a reviewed change to the declared function of a component.

1. Evidence and Knowledge records the revised claim, evidence, uncertainty, and
   Machine-variant scope.
2. The Machine Model produces a new component revision.
3. The dependency engine identifies affected relations, concepts,
   representations, lessons, assembly steps, explanations, checks, tutor cases,
   builds, and releases.
4. Existing approvals for affected projections become stale or require review;
   unrelated approvals remain intact.
5. Course Factory workspaces receive typed correction work against the same
   semantic identity.
6. The compiler rejects inconsistent source and later produces a new build from
   the coherent revision set.
7. Required validations and tutor evaluations run against the new build.
8. Publication creates a related release; it does not rewrite the history of
   the earlier release.

This is the intended meaning of deep integration. APIs can carry the commands,
but stable identity, dependency semantics, authority, and invalidation make the
systems one organism.

## Inherited domain constraints

The [conceptual model](concepts.md) is the authority for the following domain
distinctions. Architecture must preserve them unless that model is deliberately
revised:

1. Machine identity and meaning are distinct from any representation or derived
   asset.
2. The knowledge model records scoped reviewed knowledge and uncertainty; a
   course selects, orders, and situates an applicable portion of it.
3. Every course binds exactly one primary Machine; contextual and comparison
   Machines have explicit secondary roles.
4. A lesson completes an educational objective; an assembly step performs a
   concrete state-changing action within that objective.
5. Assembly first expresses structure, relation, state, and educational
   causality. Simulation can deepen a course where evidence shows that it serves
   understanding.
6. Progress records observable course facts and does not by itself prove
   comprehension.
7. Recursive Machine depth is supported; each course records where and why its
   educational depth stops.

## Architectural hypotheses

The following statements currently have **hypothesis** status. Each should later
record scope, supporting evidence, counterexamples, and a promotion, revision,
or rejection decision.

1. One logical entity remains traceable across research, authoring, compilation,
   runtime, tutoring, observation, and maintenance, while every exact state uses
   an immutable revision identity and identity splits or merges remain explicit.
2. Important explanatory treatments, situated explanations, representations,
   checks, and tutor proposals retain traceability to concepts, claims,
   evidence, and explicit simplifications.
3. Preview, pilot, and published execution share the runtime semantics being
   validated while retaining distinct Execution Identities.
4. Tutor context is derived from exact source, runtime state, observable learner
   history, and explicitly bounded interpretations rather than disconnected
   prompt text.
5. Experimental course-specific behavior remains explicit and versioned; any
   behavior retained for publication is promoted into course source or a native
   capability.
6. Quality-gate evidence identifies the exact revision, validation result,
   reviewer or evaluator, and accepted risk.
7. A source change produces an explicit impact set and revalidation plan.
8. A release identifies the versions required to recover its declared behavior.
9. Accessibility participates in representation and interaction semantics
   rather than only a final compliance pass.
10. No present external substrate is assumed to be the permanent lower boundary
    of project sovereignty.

## Progressive technical sovereignty

The [engineering doctrine](engineering-doctrine.md) classifies external
technology as a research instrument, temporary scaffold, reference
implementation, provisional dependency, or native component.

The architecture should maintain a dependency-sovereignty record for every
material non-native capability:

- current classification and purpose;
- concepts or workflow it imposes;
- canonical data or behavior it can influence;
- adapter and containment boundary;
- current replacement difficulty;
- native capability being investigated;
- evidence required to retain, internalize, or replace it;
- migration and recovery path;
- controlling organization, license, format, and remote-service assumptions;
- models, datasets, runtimes, and material transitive dependencies;
- date and result of the latest exit or recovery exercise.

Containment prevents a scaffold from becoming semantic authority by inertia.
Internalization remains an evidence-based engineering program rather than a
symbolic rewrite of generic infrastructure.

Periodic exit exercises should demonstrate that Machines can recover canonical
records, provenance, evaluation history, and build interpretation without the
scaffold. Where behavioral compatibility matters, the exercise should compare
results under a declared tolerance and document any lost capability.

## Reference-course evidence dependency

The [reference-course evidence program](research-program.md#reference-course-evidence-program)
is authoritative for generation order and promotion evidence.

The architecture responds to that program by keeping proposed boundaries
replaceable, labeling custom experimental behavior, preserving exact revisions,
and recording which generation supplied evidence for each promoted contract. A
later generation can revise an earlier boundary while retaining migration and
release history.

## Cross-cutting concerns

The following concerns affect every plane and require dedicated future
specification:

- accessibility;
- privacy and learner-data governance;
- security and integrity of canonical source;
- localization and language behavior;
- performance and resource budgets;
- provenance and intellectual-property constraints;
- human review and responsibility;
- archival recovery and disaster resilience;
- observability without surveillance;
- migration across decades of technology change.

## Open architectural questions

The following questions remain deliberately open:

- Which parts of the semantic substrate should become an executable Machines
  Language, and which should remain models or protocols?
- Which identities and revision semantics are sufficient for long-lived
  cross-course reuse?
- How should facts, interpretations, simplifications, and pedagogical choices be
  typed and reviewed?
- Which native geometry representation best supports mechanical, electrical,
  biological, digital, and hybrid Machines?
- How should semantic geometry compile into device-specific rendering without
  losing educational intent?
- Which runtime state transitions require exact replay and which permit bounded
  variation?
- How should pedagogical planning, language generation, verification, memory,
  and model specialization be decomposed?
- What observations can support claims about understanding without overstating
  inference?
- Which workspace boundaries improve author reasoning, and which create
  fragmentation?
- How should source branching, collaborative review, and semantic merge work?
- What is the smallest complete native vertical system that can test all major
  authority boundaries?
- At which lower layers would native implementation create material educational
  or research value?

These questions belong to the [research program](research-program.md). Their
answers should enter architecture through explicit evidence and recorded
decisions.
