# Course Factory

> Audience: LLM collaborators
> Human counterpart: [Course Factory](../human/course-factory.md)
> Role: rigorous authoring-capability, workspace, artifact, and gate map

## Purpose and status

This document maps candidate native capabilities for researching, authoring,
validating, publishing, and improving Machines courses across the fifteen
stages of the [course pipeline](course-pipeline.md).

It converts the pipeline into a connected authoring plan. It does not commit the
project to seven separate applications, databases, services, or teams. The
workspaces described here are responsibility and cognition boundaries over the
shared architecture in [architecture.md](architecture.md).

The reference course must test these boundaries before they become stable
product structure.

## Scope within the architecture

The [architecture terminology](architecture.md#core-terminology) is authoritative
for `Course Factory`, `Course Studio`, and `Workspace`.

Applied here, the Course Factory spans course production and research. Course
Studio is its candidate human-facing shell, and each workspace is a specialized
projection of shared semantic source. The same Machines Runtime executes
previews, pilots, and published courses as a distinct execution system used by
the factory.

A workspace can later become one view, several coordinated views, a distinct
application, or an automation surface. That physical decision follows evidence
about author workflow, performance, collaboration, and system evolution.

## Factory topology

```text
                            Course Control
                                  |
              +-------------------+-------------------+
              |                   |                   |
              v                   v                   v
   Evidence & Knowledge   Learning Design   Assembly & Visual
          Studio               Studio             Studio
              \                   |                   /
               \                  |                  /
                +-----------------+-----------------+
                                  |
                              Tutor Lab
                                  |
                                  v
                           Build & Preview
                                  |
                                  v
                   Release & Learning Observatory
                                  |
                                  v
                       runtime and learner evidence
                                  |
                                  +----> causal revision
```

This diagram emphasizes workflow. Semantically, every workspace operates on
controlled projections of the same canonical source and stable identities.

## Workspace map

| Workspace | Primary pipeline stages | Primary output |
| --- | --- | --- |
| Course Control | Primary in stage 1; governance and every gate across stages 1–15 | Scope, responsibility, risks, gates, approvals, and decisions. |
| Evidence & Knowledge Studio | 2–4; causal corrections from 12 and 15 | Sources, claims, Machine Model, relations, concepts, uncertainty, and knowledge. |
| Learning Design Studio | 5, 7, and 9; shared responsibility in 6 | Chapters, lessons, objectives, prototype findings, explanations, and checks. |
| Assembly & Visual Studio | 6 and 8; Machine-Model consumption from 3 | Assembly states, connections, representations, camera, animation, and interaction intent. |
| Tutor Lab | 10 and the tutor line of stage 12 | Context, pedagogy, datasets, behavior specifications, model versions, and evaluations. |
| Build & Preview | 7, 11, and 12 | Compiled course, reference execution, diagnostics, defects, and validation evidence. |
| Release & Learning Observatory | 13–15 | Pilots, observations, releases, maintenance signals, and revalidation plans. |

The initial taxonomy called the final workspace **Release & Analytics**. The
current planning name is **Release & Learning Observatory** because generic
analytics can blur operational telemetry, research observations, learner
evidence, and educational interpretation. The workspace can present them
together while preserving their different authorities and uncertainty.

## Complete pipeline mapping

The following artifact names are candidate semantic types, not finalized
schemas.

Course Control owns the gate decision and lifecycle transition after every
stage, even when another workspace owns the stage output. The supporting-workspace
column names active coauthoring or specialist review and therefore does not
repeat Course Control on every row.

| Stage | Primary workspace | Supporting workspaces | Candidate canonical result |
| --- | --- | --- | --- |
| 1. Propose and select | Course Control | Evidence & Knowledge | `CourseProposal`, catalog comparison, preliminary Machine boundary, educational-value assessment, capability gaps, risks, and decision rationale. |
| 2. Scope and research | Evidence & Knowledge | Course Control | `ScopeDefinition`, `MachineVariant`, `Claim`, `EvidenceLink`, `OpenQuestion`, versioned `TerminologySet`, source conflicts, and expert review. |
| 3. Decompose the Machine | Evidence & Knowledge | Assembly & Visual | `MachineModel` with recursive components, functions, relations, flows, materials, exclusions, and simplification decisions. |
| 4. Build the knowledge graph | Evidence & Knowledge | Learning Design | Versioned `KnowledgeSlice` with concepts, prerequisites, evidence, `ExplanatoryTreatment` records, and transfer relationships. |
| 5. Design the learning journey | Learning Design | Evidence & Knowledge, Course Control | `CourseBlueprint` bound to exactly one `primary_machine_variant_id`, with learner assumptions, outcomes, chapters, lessons, objectives, `CheckSpecification` records, coverage, and deliberate order. |
| 6. Design the assembly sequence | Assembly & Visual | Learning Design, Build & Preview | `AssemblyScript` with states, transitions, availability, actions, constraints, feedback, hints, reveals, and completion conditions. |
| 7. Test at low fidelity | Learning Design | Assembly & Visual, Build & Preview | Complete `LowFidelityPrototype`, typed `PrototypeSession` evidence, `PrototypeFinding` entries, and prioritized corrections. |
| 8. Produce representations and interactions | Assembly & Visual | Evidence & Knowledge, Learning Design, Build & Preview | `ProductionInventory`, `RepresentationRequirement`, `ProductionItem`, and reviewed `RepresentationSet` linked to components, relations, steps, geometry sources, connection topology, camera intent, animation, and educational purpose. |
| 9. Write educational content | Learning Design | Evidence & Knowledge, Assembly & Visual, Build & Preview | `SituatedExplanationSet`, narration, instructions, error feedback, terminology applications, `CheckRealization` records, and scoped `ContentReview` evidence. |
| 10. Prepare pedagogical intelligence | Tutor Lab | Evidence & Knowledge, Learning Design, Build & Preview | `TutorSpecification`, context projections, pedagogical policies, datasets, model identities, and `TutorEvaluationSuite`. |
| 11. Integrate the course | Build & Preview | Every authoring workspace | Immutable `CourseBuild`, dependency closure, compiler diagnostics, integration inventory, and known limitations. |
| 12. Validate quality | Build & Preview | Course Control and every specialist workspace | `ValidationRun`, exact approvals, defects, regression evidence, accepted risks, and candidate-publication status. |
| 13. Pilot with learners | Release & Learning Observatory | Runtime, Build & Preview, Course Control | `PilotDeployment`, exact `ExecutionIdentity`, `PilotSession`, `LearnerArtifact`, `ObservationRecord`, `PilotFinding`, qualitative notes, and bounded `LearningInterpretation` records. |
| 14. Publish | Release & Learning Observatory | Course Control, Build & Preview | Recoverable `CourseRelease` referencing an approved Execution Identity or compatibility set, plus validation, risk, exposure, withdrawal, and maintenance records. |
| 15. Observe, maintain, improve | Release & Learning Observatory | Every causal workspace | `MaintenanceSignal`, `ChangeSet`, `ImpactSet`, `RevalidationPlan`, and a related corrected release when required. |

## Course Control

### Purpose

Course Control maintains the intentional and evidentiary state of a course from
proposal through retirement. It is not generic project management.

### Candidate native capabilities

- compare Machine candidates by educational value, research risk, production
  pressure, and contribution to the catalog;
- define course purpose, target learner, promise, and preliminary boundary;
- record responsibilities without equating them to fixed job titles;
- manage the course lifecycle state and allowed transitions;
- configure and decide every pipeline gate against required evidence;
- record risks, capability gaps, decisions, reviewers, and accepted limitations;
- display the exact source revision to which an approval applies;
- route a downstream defect to its likely causal stage;
- plan impact and revalidation for maintenance changes;
- compare investment in a course with knowledge and tooling it can contribute to
  future courses.

### Reads and writes

Course Control reads summary projections from every semantic model. It owns
governance records, not domain claims, visual representations, tutor behavior,
or runtime facts.

### Quality responsibility

It prevents a course from advancing when required evidence is missing or stale.
It makes exceptions explicit, scoped, reviewed, and versioned.

## Evidence & Knowledge Studio

### Purpose

Evidence & Knowledge Studio establishes what the project knows about a Machine,
how confidently it knows it, and how that knowledge becomes a reviewed Machine
Model and reusable conceptual graph.

It is not a notes application or a detached citation library.

### Candidate native capabilities

- define Machine variant, boundary, operating conditions, and exclusions;
- capture claims with source, scope, authority, version, and uncertainty;
- compare conflicting sources and record unresolved questions;
- manage expert review and corrections;
- decompose Machines into recursive components and subsystems;
- author function, containment, relation, flow, material, state, and dependency;
- record why a detail is included, simplified, or omitted;
- convert validated Machine understanding into Knowledge Concepts;
- define prerequisites and alternative explanation depths;
- author versioned technical terms, learner-facing labels, aliases, locale,
  scope, depth, and ambiguous-use rules;
- identify transferable concepts across Machines and courses;
- propagate revised evidence to dependent entities and approvals.

### Candidate views

- evidence-to-claim graph;
- Machine boundary and variant comparison;
- recursive component structure;
- functional and causal relation graph;
- flow and dependency views;
- unresolved-question and contradiction view;
- concept and prerequisite graph;
- terminology, alias, locale, and ambiguity view;
- cross-course reuse and applicability view.

### Quality responsibility

The Studio detects unsupported claims, orphan components, functions without
relations, relations without evidence, contradictory scopes, hidden uncertainty,
and depth that lacks educational justification.

## Learning Design Studio

### Purpose

Learning Design Studio turns reviewed Machine knowledge into a deliberate path
for constructing understanding.

It is not a generic learning-management course builder.

### Candidate native capabilities

- define learner assumptions and the final observable outcome;
- bind the course to exactly one primary Machine variant and type contextual or
  comparison-Machine references explicitly;
- organize chapters as coherent functional or structural advances;
- create lessons with one primary learning objective;
- map every objective to components, relations, concepts, and evidence;
- order complexity while detecting hidden prerequisites;
- design prediction, observation, explanation, practice, and reflection moments;
- design `CheckSpecification` records that declare the reasoning evidence to be
  collected;
- author `SituatedExplanation` and `CheckRealization` records, instructions,
  narration, and error feedback in exact course states;
- construct the complete low-fidelity course using real semantic source and
  placeholder representations;
- record typed `PrototypeSession` evidence, including participant relation to
  the design, assistance, path, observed gaps, completion outcome, and version;
- record prototype observations and route corrections to their causal stage;
- collect separate precision, pedagogical, editorial, and in-experience
  `ContentReview` records;
- compare learner paths and explanation depths without duplicating reviewed
  knowledge records.

### Candidate views

- course, chapter, lesson, and step outline;
- objective and concept coverage matrix;
- prerequisite and complexity path;
- Machine construction timeline;
- learner-information boundary by course state;
- misconception and check coverage;
- low-fidelity walkthrough and finding timeline;
- prototype-session evidence and assistance comparison;
- check-specification-to-realization alignment;
- content-review coverage by required review dimension;
- in-context content editor over the reference runtime.

### Quality responsibility

The Studio detects unobservable objectives, multiple unrelated objectives,
uncovered Machine relations, premature concepts, repeated steps without new
understanding, unsupported explanations, and checks that cannot distinguish
reasoning from guessing. A prototype gate also remains incomplete without a
recorded end-to-end session by a person sufficiently independent from the
design, and a content gate remains incomplete without all required scoped
reviews.

## Assembly & Visual Studio

### Purpose

Assembly & Visual Studio authors how semantic Machine entities become visible,
manipulable, and understandable through construction.

It is not a general modeling package, CAD wrapper, or game scene editor with
custom metadata.

### Candidate native capabilities

- author assembly states and semantic transitions;
- define component availability, visibility, selection, orientation, placement,
  connection, and completion constraints;
- distinguish expected, allowed, mistaken, and exploratory actions;
- design graduated feedback and hints for assembly errors;
- bind every action and reveal to an educational intention;
- derive a production inventory from the approved prototype and Assembly Script;
- track every `RepresentationRequirement` and `ProductionItem` through owner,
  source, reuse decision, review state, and realized representation;
- create semantic representations at deliberate levels of detail;
- author connection topology, exploded states, cuts, transparency, and
  isolation;
- express flow, transformation, dependency, and causality visually;
- define camera and attention intent rather than only numeric transforms;
- author explanatory animation rather than decorative motion;
- validate legibility, accessibility, and consistency with the Machine Model;
- derive build-specific geometry and assets without transferring semantic
  authority to them.

### Candidate views

- assembly state graph;
- semantic connection and constraint editor;
- Machine and Representation comparison;
- representation-intent inspector;
- production requirement, item, realization, and review coverage;
- exploded, cutaway, flow, and relation authoring;
- camera and attention sequence;
- interactive preview with semantic diagnostics;
- visual accessibility and occlusion analysis.

### Quality responsibility

The Studio detects impossible transitions, ambiguous placement, false implied
relations, unmodeled component behavior, visually hidden meaning, decorative
motion without purpose, and representations that no longer match the reviewed
Machine variant. The production gate also requires every approved requirement
to have a reviewed realization or an explicit scoped disposition.

## Tutor Lab

### Purpose

Tutor Lab develops and validates the complete Pedagogical Intelligence system.
It is not a prompt editor around a generic chatbot.

### Candidate native capabilities

- inspect the exact pedagogical frame available at any course state;
- define permitted knowledge, depth, memory, and uncertainty boundaries;
- author pedagogical strategies such as observe, ask, hint, contrast, explain,
  defer, verify, and recover;
- create direct, ambiguous, mistaken-premise, future-content, out-of-scope, and
  uncertainty scenarios;
- curate training and evaluation data with lineage and review;
- compare model, retrieval, planning, verification, memory, and inference
  configurations;
- evaluate absolute floors for grounding, correctness, scope safety,
  uncertainty, timing, progression, and regression resistance;
- compare qualified systems with declared samples, effect measures, uncertainty,
  blinded identity evaluation, and ablations of native elements;
- replay tutor proposals against exact builds and learner histories;
- detect regressions across model, course, knowledge, and runtime revisions;
- package compatible tutor specifications and model artifacts for release.

### Candidate views

- pedagogical-frame inspector;
- course-state and allowed-knowledge navigator;
- strategy and behavior editor;
- dataset and lineage explorer;
- scenario runner and conversational replay;
- comparative evaluation dashboard;
- failure clustering and regression analysis;
- tutor identity and style evaluation.

### Quality responsibility

Tutor Lab detects invented components, unsupported claims, premature revelation,
disproportionate depth, generic disconnected conversation, unacknowledged
uncertainty, ineffective hint progression, and behavior that is inconsistent
with Machines identity.

## Build & Preview

### Purpose

Build & Preview compiles, diagnoses, executes, and validates an exact course
revision using the same semantic runtime contract intended for learners.

It is not a conventional asset bundle step.

### Candidate native capabilities

- resolve semantic identities and dependency closure;
- compile complete and partial course builds;
- run low-fidelity placeholders and final representations from the same course
  semantics;
- detect missing references, orphans, cycles, unreachable states, hidden
  prerequisites, and undeclared special cases;
- require exactly one primary Machine variant and validate every contextual
  Machine role;
- verify production-inventory closure;
- verify that every `CheckRealization` collects the reasoning evidence declared
  by its `CheckSpecification`;
- verify required `PrototypeSession` and `ContentReview` evidence;
- inspect compiler derivations and generated artifacts;
- execute all normal, error, resumption, and completion paths;
- run domain, pedagogical, assembly, progress, tutor, accessibility, visual, and
  scoped content-review validation suites;
- compare source and build revisions semantically and visually;
- record defects with symptom, expectation, learning impact, causal stage,
  affected entities, correction owner, and regression evidence;
- produce an immutable build and validation manifest.

### Candidate views

- compiler diagnostics linked to source entities;
- dependency and invalidation graph;
- runtime state inspector;
- route and state-coverage explorer;
- build-to-build semantic diff;
- visual and tutor regression review;
- defect and causal-stage view;
- quality-gate evidence dashboard.

### Quality responsibility

Build & Preview reports incomplete or inconsistent semantics. It does not make a
course appear complete by adding hidden runtime fixes.

## Release & Learning Observatory

### Purpose

Release & Learning Observatory pilots, publishes, observes, recovers, and
maintains exact builds and course releases while preserving the difference
between events, research evidence, and conclusions.

It is not generic product analytics or business intelligence.

### Candidate native capabilities

- define pilot protocols and participant scope;
- create a `PilotDeployment` over exact Execution Identities before a release
  exists;
- connect observations to exact execution, session, state, entity, objective,
  and feedback, with optional release identity after publication;
- keep durable Course Progress, append-oriented Observation Records, and bounded
  Learning Interpretations as distinct contracts;
- collect action traces, explanations, help requests, qualitative notes, and
  transfer evidence under explicit policy;
- distinguish operational health, learner behavior, educational inference, and
  research conclusion;
- triangulate completion, timing, mistakes, assistance, explanation, and
  interview evidence;
- create immutable release manifests with exact compatibility and approvals;
- manage gradual exposure, recovery, withdrawal, and archival access;
- detect repeated confusion, stale evidence, regressions, and reuse
  opportunities;
- classify changes and compute the earliest affected stage;
- create change sets, impact sets, and selective revalidation plans;
- compare course generations without losing their historical conditions.

### Candidate views

- pilot session and observation timeline;
- Execution Identity and pilot-deployment inspector;
- release compatibility and provenance graph;
- learning-intention-to-observation view;
- repeated-confusion and assistance patterns;
- operational health separated from learning evidence;
- maintenance signal and causal-source navigator;
- revalidation plan and release lineage;
- archival recovery status.

### Quality responsibility

The Observatory prevents a metric from becoming an unsupported learning claim.
It preserves uncertainty, cohort and version scope, qualitative context, and
alternative interpretations.

## Creator and LLM operating boundary

The Course Factory should preserve the responsibility boundary established by
[Decision 0002](../decisions/0002-creator-authorship-and-llm-engineering-boundary.md).
The creator should spend most working time authoring Machines, Courses, and the
learner-facing experience. The LLM should absorb enabling engineering,
operations, repetitive work, and technical maintenance.

Its execution and visual substrate follows
[Decision 0003](../decisions/0003-machines-native-engine-foundation.md). The
factory authors canonical Machines semantics directly; it does not treat a
generic game-engine project, scene, object graph, or editor format as the source
of truth. Native engine previews and published execution must interpret the
same compiled Course meaning.

| Workspace | Creator leads | LLM leads |
| --- | --- | --- |
| Course Control | Machine selection, Course promise, scope, learner-facing risk acceptance, publication readiness, and consequential gate decisions. | State machinery, evidence aggregation, work routing, gate automation, impact analysis, and routine operational decisions. |
| Evidence & Knowledge Studio | Research direction, source interpretation, Machine boundary, decomposition, explanatory meaning, and acceptance of important Claims. | Source ingestion, provenance tooling, structured modeling, contradiction detection, traceability, validation, and repetitive transformations. |
| Learning Design Studio | Outcomes, Chapters, Lessons, assembly path, explanations, checks, misconceptions, and educational judgment. | Editing tools, dependency analysis, completeness checks, preview plumbing, structured assistance, and mechanical propagation. |
| Assembly & Visual Studio | Interaction design, animation, effects, visual direction, camera intent, representations, assets, and experiential acceptance. | Geometry and representation infrastructure, engine behavior, editors, constraints, performance, asset processing, and automated validation. |
| Tutor Lab | Tutor identity, pedagogy, tone, timing, visible behavior, and learner-facing quality. | Grounding, retrieval, memory implementation, model systems, datasets, evaluation harnesses, deployment, security, latency, and cost engineering. |
| Build & Preview | Acceptance of learner-visible fidelity and behavior. | Compiler, build graph, diagnostics, test execution, compatibility, performance, and preview/runtime parity. |
| Release & Learning Observatory | Course release readiness, educational questions, interpretation that changes the experience, and learner-affecting policy. | Pilot and release infrastructure, observation pipelines, operational analytics, storage, privacy controls, deployment, rollback, monitoring, and maintenance routing. |

### Authoring-state rules

- Creator-authored source remains distinguishable from LLM proposals, derived
  artifacts, and automated repairs.
- The LLM may implement, optimize, migrate, and validate accepted authored
  intent, but it does not silently change learner-facing meaning.
- A workspace should expose semantic controls at the creator's altitude rather
  than exposing infrastructure configuration.
- Repetitive transformations should be automated when their inputs, outputs,
  provenance, and failure behavior are inspectable.
- LLM-owned systems can evolve autonomously within accepted contracts when the
  result preserves author workflow and learner-facing behavior.
- A learner-visible or author-control tradeoff crosses the shared seam and
  requires the smallest necessary creator decision.

### Infrastructure invisibility

Course authorship should not require the creator to manage deployment,
persistence, authentication, authorization, analytics plumbing, payment
integration, backups, migrations, security controls, or service operations.
Those capabilities should appear only through meaningful product controls,
diagnostics, or escalations.

Infrastructure invisibility does not mean hidden behavior. The LLM must preserve
auditability, status, risk, recovery, and concise reporting while avoiding
unnecessary creator supervision.

## Shared factory capabilities

Every workspace depends on capabilities that should be designed once around the
semantic substrate.

### Identity and revision

- stable entity identity;
- immutable revisions or equivalent historical reconstruction;
- branches and controlled merge;
- exact build and release lineage;
- references that survive representation and storage changes.

### Provenance and claim state

- authorship and automated-proposal identity;
- source and evidence lineage;
- authored, proposed, reviewed, validated, derived, and published states;
- uncertainty and applicability scope;
- rationale for simplification and omission.

### Dependency and impact analysis

- semantic dependency traversal;
- automatic propagation where safe;
- explicit invalidation where judgment is required;
- earliest causal pipeline stage;
- selective revalidation closure;
- affected-build and affected-release discovery.

### Review and quality gates

- role-aware review without requiring fixed organizational roles;
- gate predicates tied to exact source revisions;
- reviewer, evaluator, evidence, and accepted-risk records;
- stale-approval detection;
- regression evidence.

### Semantic diff and navigation

- entity-level and relation-level change views;
- authored versus derived comparison;
- navigation from source to runtime and back;
- cross-course concept and component reuse;
- search that respects identity, version, scope, and uncertainty.

### Candidate native assistance

- proposals grounded in the exact workspace context;
- visible source and derivation;
- bounded authority and review requirements;
- evaluation against workspace-specific quality criteria;
- ability to reject, revise, compare, and learn from proposals;
- no conversion of plausible generated output into an accepted canonical record
  without explicit authority, review state, and evidence.

### Collaboration and responsibility

- explicit ownership of work and review;
- comments and decisions attached to semantic entities;
- handoff without lossy document summaries;
- independent high-risk review where required;
- durable history of disagreements and resolutions.

## Cross-workspace correction flow

Every workspace can discover a defect. The workspace where a symptom appears is
not automatically the authority that should correct it.

```text
Observed symptom
       |
       v
Identify affected semantic entity and exact revision
       |
       v
Locate earliest plausible causal stage and authority
       |
       v
Create a typed correction request
       |
       v
Revise canonical source in the responsible workspace
       |
       v
Compute downstream impact and required revalidation
       |
       v
Compile, verify, and relate the resulting release
```

For example, Tutor Lab can discover that an answer is misleading because the
Machine Model contains an oversimplified relation. Tutor Lab records the failing
scenario, but Evidence & Knowledge Studio corrects the relation and evidence.
The compiler then identifies affected lessons, representations, checks, tutor
cases, builds, and releases.

## Authoring metrics

The factory should measure its own ability to improve without reducing quality.
Candidate measures include:

- time and effort by pipeline stage;
- number and severity of defects by causal stage;
- corrections found before expensive production;
- evidence and concept reuse with applicability review;
- authored versus safely derived work;
- invalidations and migrations caused by schema evolution;
- tutor and representation regressions detected before release;
- author time spent understanding versus repairing tool fragmentation;
- time required to trace an observation to its source;
- quality change across course and tool generations.

These measures require qualitative interpretation. Lower production time is not
automatically improvement if evidence, understanding, traceability, or future
potential declines.

## Reference-course factory obligations

The [reference-course evidence program](research-program.md#reference-course-evidence-program)
is authoritative for generation order.

Across those generations, the factory must preserve every manual artifact and
decision, identify risky handoffs and missing semantics, observe real author
work, keep custom behavior explicit, and record the evidence that promotes a
candidate workspace capability. A later generation can reorganize the Studio
without losing source identity, review history, or course evidence.

## Open factory questions

- Should Course Studio be one application shell or a family of native tools?
- Which workspace transitions require synchronous collaboration?
- Which source operations need branching and semantic merge?
- How should spatial, graph, timeline, textual, and runtime views remain
  synchronized?
- Which authoring actions can be safely derived, and which require explicit
  judgment?
- How should model-assisted proposals learn from corrections without
  absorbing unreviewed course content?
- Which quality gates can be executable predicates and which require expert or
  learner evidence?
- How should reusable patterns be promoted without erasing Machine-specific
  differences?
- Which workspace should present cross-cutting accessibility work while keeping
  it embedded in every representation and interaction?
- Which author observations should influence architecture rather than only user
  interface design?

These questions belong to the [long-term research program](research-program.md)
and should be resolved through complete course work, observed authoring, and
explicit decisions.
