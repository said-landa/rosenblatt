# Long-Term Research Program

> Audience: LLM collaborators
> Human counterpart: [Research Program](../human/research-program.md)
> Role: rigorous research questions, artifacts, evidence, and promotion gates

## Purpose

The Machines research program organizes questions whose answers can require
multiple courses, system generations, and empirical studies.

It is not a fixed implementation roadmap. It is a durable structure for
accumulating questions, hypotheses, experiments, evidence, limitations, and
decisions without converting current intuition into permanent architecture.

The [engineering doctrine](engineering-doctrine.md) defines how this research
should be conducted. The [architecture](architecture.md) may adopt a research
result only within the scope supported by its evidence.

## Program structure

| Program | Central subject | Primary downstream effect |
| --- | --- | --- |
| RP-01 | Machine ontology and semantic expression | Canonical semantics and candidate authoring languages. |
| RP-02 | Evidence and Machine knowledge | Claims, provenance, uncertainty, and reuse. |
| RP-03 | Learning and course design | Educational sequence and interaction intent. |
| RP-04 | Semantic geometry and representation | Native visual explanation of Machines. |
| RP-05 | Native runtime and interaction | Faithful execution of assembly experiences. |
| RP-06 | Pedagogical intelligence | Native tutor behavior, identity, and evolution. |
| RP-07 | Learner understanding and evaluation | Evidence for comprehension, transfer, and retention. |
| RP-08 | Course factory and authoring | Deeply integrated tools for every pipeline phase. |
| RP-09 | Compilation, validation, and evolution | Safe derivation, diagnosis, release, and change. |
| RP-10 | Institutional memory and research infrastructure | Interpretability across decades. |

These programs are coupled. Their boundaries organize responsibility; they do
not imply independent realities or isolated teams.

## RP-01 — Machine ontology and semantic expression

### Central question

How should Machines express Machine entities, components, containment, functions,
relations, states, flows, transformations, levels of abstraction, and
educational interpretations without reducing them to the assumptions of a
generic tool? Which parts require an executable Machines Language, and which are
better expressed as models, constraints, commands, or protocols?

### Research directions

- recursive component structure plus distinct logical and immutable revision
  identity;
- functional and causal relations;
- physical, logical, biological, digital, and hybrid machines;
- Machine variants and boundaries;
- state, behavior, process, and flow;
- deliberate simplification and omitted detail;
- multiple valid representations of one semantic entity;
- human-readable and machine-verifiable authoring constructs;
- type systems, constraints, schemas, and migrations;
- the boundary between a semantic substrate and an executable Machines
  Language.

### Durable artifacts

- ontology and glossary;
- canonical identifiers and invariants;
- versioned schemas;
- candidate language specifications;
- conformance examples and counterexamples;
- migration and compatibility tests.

### Required evidence

The model must express the reference course end to end and later survive
machines from meaningfully different domains without hiding course-specific
behavior in untyped escape hatches.

## RP-02 — Evidence and Machine knowledge

### Central question

How should the project represent what is believed about a Machine, why it is
believed, which sources support it, where sources disagree, and how knowledge
can be reused without laundering uncertainty?

### Research directions

- claims, sources, excerpts, observations, and expert judgments;
- authority, applicability, date, and Machine-variant scope;
- disagreements and unresolved questions;
- derivation from evidence to Machine and knowledge models;
- simplification rationale;
- reusable concepts and prerequisites across courses;
- source freshness and downstream invalidation;
- alternative explanations at different depths;
- review, approval, and correction workflows.

### Durable artifacts

- evidence model and provenance graph;
- source and claim review policies;
- uncertainty vocabulary;
- knowledge-graph contracts;
- contradiction and stale-source diagnostics;
- cross-course reuse records.

### Required evidence

An important explanation, representation, check, or tutor answer should be
traceable through concepts and claims to the evidence and simplifications that
justify it.

## RP-03 — Learning and course design

### Central question

How does constructing a Machine help a learner develop a transferable mental
model rather than merely complete an attractive sequence of actions?

### Research directions

- curiosity, prediction, observation, explanation, and reflection;
- decomposition and ordering of complexity;
- one-objective lessons and meaningful assembly steps;
- prerequisite detection and conceptual gaps;
- graduated hints and productive error;
- situated explanations and checks for understanding;
- transfer between Machines;
- misconception discovery and repair;
- learner differences and selectable depth;
- long-term retention and reconstruction without the visual model.

### Durable artifacts

- learning-design patterns and counter-patterns;
- misconception taxonomy;
- course-blueprint contracts;
- prototype protocols;
- explanation and feedback patterns;
- reusable evaluation instruments.

### Required evidence

Learners should be able to explain relevant structure, function, and relations
and transfer selected ideas beyond the exact sequence they completed. Completion
alone is insufficient evidence.

## RP-04 — Semantic geometry and representation

### Central question

How should reviewed Machine meaning become visual and interactive form while
preserving declared function and educational intent?

### Research directions

- measured, imported, manually authored, and procedurally generated geometry
  bound to component meaning and constraints;
- explicit separation of Machine semantics, representation intent, geometric
  source, and compiled render assets;
- connection topology, orientation, and assembly affordances;
- levels of detail and explanatory abstraction;
- exploded views, cutaways, transparency, isolation, and comparison;
- visual expression of energy, information, force, and material flow;
- pedagogical animation and camera intent;
- visual identity across heterogeneous Machines;
- automatic and assisted simplification;
- semantic validation of representations;
- native geometry algorithms, authoring interactions, and rendering methods.

### Durable artifacts

- representation model;
- semantic geometry kernel experiments;
- connection and constraint language;
- camera and animation-intent contracts;
- visual validation suites;
- representation corpora and style studies.

### Required evidence

A representation must improve a predeclared explanatory task under a stated
evaluation method. Literal geometry, altered scale, exaggerated motion,
schematics, and other nonphysical representations can be educationally correct
when the transformation and its purpose are declared. The gate rejects
undeclared misleading implications about function, connection, scale, or
behavior. Educational intent, geometric source, transformations, and validation
remain attached through derivation and revision.

## RP-05 — Native runtime and interaction

### Central question

Which runtime primitives are required to execute a machine-understanding course
faithfully, responsively, accessibly, and observably?

The production destination is the Machines-native foundation accepted in
[Decision 0003](../decisions/0003-machines-native-engine-foundation.md). This
program discovers its exact internal architecture and lower dependency boundary;
it does not compare generic game engines as candidate product foundations.

### Research directions

- assembly and disassembly states;
- semantic selection, placement, connection, and inspection;
- allowed, expected, mistaken, and exploratory actions;
- component and relation visibility;
- prediction and verification moments;
- feedback and graduated assistance;
- pedagogical camera and focus control;
- progress, resumption, replay, and version migration;
- accessibility as an interaction property;
- performance across target devices;
- separation between deterministic course, assembly, session, or progress state
  and rendering behavior;
- native rendering architecture where it improves Machines-specific expression;
- dependency-boundary experiments for graphics, geometry, spatial queries,
  shaders, input, media, and device integration.

### Durable artifacts

- runtime state model;
- interaction grammar;
- reference runtime;
- replay and state-transition tests;
- accessibility contracts;
- performance scenarios and budgets;
- runtime compatibility model.

### Required evidence

Preview, pilot, and published execution must agree on the semantics being
validated. A learner should be able to complete, leave, resume, inspect, make
meaningful mistakes, and recover without corrupting the course state or its
educational sequence.

## RP-06 — Pedagogical intelligence

### Central question

How should the native Machines tutor observe the current learning situation,
choose a pedagogical action, explain, ask, hint, verify, remember, and fail
safely?

### Research directions

- a structured perceptual frame derived from exact course and runtime state,
  observable learner history, and bounded learner-model hypotheses;
- grounding in Machines knowledge and evidence;
- pedagogical planning before utterance generation;
- hint progression and question selection;
- misconception diagnosis;
- uncertainty and evidence boundaries;
- memory and privacy;
- characteristic voice and educational identity;
- training corpora controlled by the project;
- behavioral evaluation and red-team scenarios;
- distillation, continued training, retrieval, planning, verification, model
  composition, and neuro-symbolic alternatives;
- native inference and model architecture when supported by evidence.

### Durable artifacts

- tutor behavioral contract;
- tutor-context schema;
- pedagogical-action vocabulary;
- curated datasets and lineage;
- evaluation suites;
- model and inference experiments;
- versioned tutor specifications and compatibility records.

### Required evidence

Before comparative improvement is considered, the tutor must meet predeclared
absolute floors for correctness, evidence grounding, scope safety, uncertainty
behavior, pedagogical timing, hint progression, and regression resistance.

Comparison with baselines must declare sample construction, evaluator protocol,
effect measure, uncertainty, and practical significance. Ablations should test
the contribution of Machines-native elements—course-state modeling, corpus,
planner, retrieval, verifier, memory, or specialization—under a declared
intervention and analysis design. Causal language is reserved for designs that
support the corresponding causal claim.

Tutor identity must be defined as observable behavior and evaluated through
blinded comparisons where practical. A distinctive label, model endpoint,
fine-tune, or owned set of weights does not by itself meet this criterion.

## RP-07 — Learner understanding and evaluation

### Central question

Which observations justify bounded claims about recognition, reasoning,
explanation, transfer, retention, and misconception repair?

### Research directions

- observable facts versus inferred understanding;
- explanation analysis;
- action sequences and diagnostic mistakes;
- prediction before intervention;
- transfer tasks across representations and Machines;
- delayed retention;
- confidence and uncertainty in learner models;
- qualitative observation combined with quantitative measures;
- accessibility and evaluation fairness;
- privacy-preserving research design.

### Durable artifacts

- learner-observation model;
- assessment protocols;
- comprehension-evidence rubrics;
- study designs;
- inference limits;
- validation and replication records.

### Required evidence

Every claim about understanding must state the observed evidence, inference
method, tested population, course version, uncertainty, and known alternative
interpretations.

## RP-08 — Course factory and authoring

### Central question

How can every stage of the course pipeline be supported by native tools that
share meaning and improve both course quality and the quality of future
production?

### Capability areas

- Course Control;
- Evidence & Knowledge Studio;
- Learning Design Studio;
- Assembly & Visual Studio;
- Tutor Lab;
- Build & Preview;
- Release & Learning Observatory.

These are responsibility and workflow boundaries. Evidence will determine
whether they become views of one studio, composable systems, or distinct
applications over a shared semantic substrate.

### Research directions

- author cognition and workflow;
- semantic editing rather than disconnected file editing;
- cross-workspace impact analysis;
- review, approval, and causal defect routing;
- human–intelligence collaboration with visible provenance;
- reusable patterns without premature generalization;
- authoring efficiency without quality compression;
- native interfaces for Machine, learning, geometry, tutor, and validation work;
- the relationship between expert judgment and automated validation.

### Durable artifacts

- workspace contracts;
- authoring studies;
- capability prototypes;
- shared command and revision model;
- authoring metrics;
- validated patterns and known failure modes.

### Required evidence

The factory must preserve one semantic reality, make consequences discoverable,
and improve the ability to produce and revise a course without allowing speed
or reuse to hide errors.

## RP-09 — Compilation, validation, and evolution

### Central question

How should canonical sources become versioned course packages, and how should
changes propagate without silent semantic loss?

### Research directions

- source graphs and dependency closure;
- typed compilation and static analysis;
- diagnostics tied to domain and pipeline stages;
- generated versus authored artifacts;
- build identity and reproducibility contracts;
- runtime and tutor compatibility;
- semantic diff and impact analysis;
- selective invalidation and revalidation;
- migrations across schemas, runtimes, and released courses;
- release, rollback, withdrawal, and archival recovery.

### Durable artifacts

- course compiler;
- validator framework;
- dependency and invalidation engine;
- immutable build and release manifests;
- compatibility and migration suites;
- causal defect records.

### Required evidence

A published release must be recoverable from explicit source, compiler, runtime,
representation, tutor, and validation identities within the reproducibility
contract declared for that generation.

## RP-10 — Institutional memory and research infrastructure

### Central question

How can decades of decisions, failures, datasets, evaluations, course versions,
and technical artifacts remain interpretable and useful?

### Research directions

- decision and experiment records;
- dataset and model lineage;
- archival formats and media migration;
- durable identifiers;
- replication and reconstruction;
- privacy, consent, retention, and deletion;
- preservation of rejected alternatives and negative results;
- long-term terminology and schema evolution;
- institutional knowledge that does not depend on one person's memory.

### Durable artifacts

- Architecture Decision Records;
- experiment registry;
- research-data governance;
- archival manifests;
- lineage graph;
- migration exercises;
- periodic reconstruction tests.

### Required evidence

A future contributor should be able to determine what was decided, what was
observed, which versions were involved, why a conclusion was bounded, and how
to reproduce or challenge the result.

## Reference-course evidence program

This section is the authoritative dependency and evidence sequence for the
reference course. It specifies what must be learned before broader architecture
is promoted; it does not impose calendar deadlines or a shallow quality ceiling.

### Generation 0 — Complete low-fidelity source

Represent the entire reference course, including evidence, Machine structure,
knowledge, terminology, learning sequence, assembly states, placeholder
representations, content intentions, tutor scenarios, validation requirements,
and maintenance assumptions.

Required evidence:

- another person can traverse the complete prototype with recorded assistance,
  path, observations, and outcome;
- missing semantics, ambiguous responsibilities, and one-off behavior are
  inventoried;
- the project can distinguish course-specific needs from candidate platform
  capabilities;
- every important artifact retains origin, status, and dependency information.

### Generation 1 — Native vertical research system

Build one representative lesson through native semantic source, authoring,
compilation, preview, runtime, pedagogical intelligence, progress, observation,
correction, and revalidation.

Required evidence:

- every authority boundary is exercised end to end;
- preview and learner execution share the same declared runtime semantics;
- a semantic change produces a traceable impact set and corrected build;
- provisional dependencies are classified and contained;
- author and learner observations reveal which proposed abstractions are useful
  and which are missing or distorted.

### Generation 2 — Complete reference course

Extend the native vertical system only through needs demonstrated by the full
reference course at its intended depth and quality.

Required evidence:

- the complete course is compiled from versioned source rather than hidden
  one-off runtime behavior;
- all pipeline gates produce revision-specific evidence;
- learners provide evidence relevant to the declared understanding outcomes;
- publication, withdrawal, recovery, maintenance, and revalidation are
  exercised;
- factory work is measured without treating production speed as the sole
  quality signal.

### Generation 3 — Adversarial second course

Choose a second Machine that deliberately challenges important assumptions from
the reference course, such as domain, representation, relation type, learner
prerequisite, interaction, or explanatory depth.

Required evidence:

- shared abstractions survive because both courses need the same meaning, not
  merely similar interface behavior;
- first-course assumptions that fail are revised, split, scoped, or removed;
- migrations preserve the first course's recorded meaning and release history;
- reuse preserves applicability review and does not copy unvalidated errors.

### Later generations

Later programs can expand Machine domains, learner populations, accessibility,
devices, representational depth, pedagogical intelligence, and lower-level
native ownership. Each expansion declares which earlier assumptions it tests
and which promotion gates apply.

Across every generation, narrow scope enables controlled investigation. It does
not imply superficial treatment. The educational and research purpose determines
the depth required of each course.

## Research record

Every investigation first declares its mode:

| Mode | Purpose | Evidence discipline |
| --- | --- | --- |
| Exploratory | Observe a poorly understood space and expose variables or failure modes. | Preserve raw observations, analysis choices, surprises, negative results, and generated hypotheses. |
| Hypothesis-forming | Turn exploratory evidence into falsifiable claims and candidate mechanisms. | Record competing explanations and the evidence needed to distinguish them. |
| Confirmatory | Test a predeclared hypothesis. | Define method, exclusions, primary measures, and acceptance or rejection thresholds before evaluation. |
| Engineering validation | Demonstrate that a capability satisfies an explicit contract in a bounded scenario. | Predeclare scenarios, tolerances, adverse cases, and pass or fail criteria. |
| Replication | Reconstruct or challenge an earlier result. | Preserve the original scope, identify deviations, and compare results under a declared method. |

Every substantive investigation records the fields applicable to its mode:

- question and motivation;
- mode, claim type, and current conclusion status;
- current evidence and uncertainty;
- reference-course or other bounded scenario;
- baseline, competing approach, or competing explanation;
- experimental or validation method;
- predeclared criteria when required by the research mode;
- data, code, artifacts, environments, versions, and rights;
- analysis decisions and deviations from the original method;
- observations, negative results, adverse cases, and limitations;
- privacy, security, consent, and data-governance considerations;
- architectural and pipeline consequences;
- replication or follow-up requirements.

## Promotion criteria

Exploratory and hypothesis-forming results can register scoped architectural
hypotheses without granting them normative authority. Promotion into an adopted
architectural decision, contract, policy, or invariant requires the universal
evidence gates below within a stated scope.

### Universal gates

1. **Claim clarity:** the result identifies its research mode, claim type,
   scope, uncertainty, and current status.
2. **Traceability:** inputs, outputs, transformations, observations, and
   decisions retain provenance.
3. **Methodological validity:** the method can answer the stated question and
   records exclusions, deviations, confounders, and alternative explanations.
4. **Failure visibility:** missing evidence, contradictions, adverse cases, and
   invalid states are detectable and reported.
5. **Reconstruction:** another investigation can reconstruct the relevant
   result under declared tolerances or explain why reconstruction is not the
   appropriate contract.
6. **Regression assessment:** adoption identifies existing behavior, knowledge,
   data, and releases that can regress.
7. **Rights and safety:** applicable privacy, security, consent, licensing, and
   data-rights reviews are complete.
8. **Limitations:** the conclusion states where it has not been tested and what
   evidence could reverse it.
9. **Independent challenge:** consequence-appropriate review, replication, or
   adversarial testing has occurred.

### Conditional domain gates

The result also satisfies every gate relevant to the capability:

- **Semantic fit:** it represents required Machine concepts without material
  distortion.
- **Cross-system coherence:** authoring, compilation, runtime, tutor, and
  validation interpret the affected meaning consistently.
- **Pedagogical value:** it improves a predeclared learning measure or removes a
  demonstrated obstacle under a stated study design.
- **Replaceability:** provisional scaffolds can be removed while preserving
  canonical records and declared behavior.
- **Native maturity:** semantic, behavioral, evaluative, data, evolutionary,
  operational, dependency, and rights dimensions meet the declared maturity
  target and material subdependencies are classified recursively.
- **Performance fitness:** measured behavior satisfies scenario-specific budgets
  and failure thresholds.
- **Migration fitness:** persisted knowledge, progress, builds, and courses can
  evolve without unreported semantic loss.
- **Reference-course evidence:** the capability works in the relevant end-to-end
  course context rather than only in isolation.

Not every research program requires a direct learner-outcome gate. For example,
archival research can be promoted through reconstruction, rights, durability,
and migration evidence. The promotion record must justify which conditional
gates apply.

Meeting these criteria does not imply universal validity. Every conclusion must
state the machines, learners, devices, versions, environments, and limitations
that bound it.

## Verification suites

The long-term program should develop suites for:

- semantic conformance and migration;
- evidence provenance and contradiction detection;
- component-change propagation and invalidation;
- representation-to-Machine consistency;
- course compilation and package recovery;
- runtime state, resumption, and version-transition behavior;
- tutor correctness, grounding, hint progression, uncertainty, and identity;
- learner comprehension, transfer, and retention;
- accessibility and interaction performance;
- scaffold replacement and canonical-data recovery.

## Review triggers

A research program should be reviewed when evidence changes, a reference course
exposes a contradiction, a new class of machines breaks an assumption, or an
architectural decision depends on an unresolved hypothesis. Calendar time alone
does not promote a hypothesis into a decision.
