# Course Creation Pipeline

> Audience: LLM collaborators
> Human counterpart: [Course Pipeline](../human/course-pipeline.md)
> Role: rigorous process, artifact, quality-gate, and correction contract

## Purpose and status

This document defines how a Course in Machines is proposed, researched, designed,
prototyped, produced, integrated, validated, piloted, released, observed, and
maintained.

The pipeline transforms one real Machine Variant into an assembly-centered
learning experience. Its purpose is to make course production repeatable,
measurable, improvable, and traceable without sacrificing domain rigor or
educational clarity.

The product is not only the runtime used by a learner. It also includes the
capability to produce excellent Courses consistently.

This pipeline is a current process contract to test through the reference
course. Artifact names correspond to candidate semantic records in the
[architecture](architecture.md) and [Course Factory](course-factory.md); they
are not finalized storage schemas.

## Expected result

At the end of the pipeline, an exact Course revision allows a learner to:

- construct one primary Machine Variant gradually;
- recognize the included principal Components;
- explain the function of each presented Component;
- explain the essential Relations that produce system behavior;
- resume from a valid prior point;
- request help that respects exact Course and Assembly State;
- demonstrate reasoning through defined checks;
- finish with a coherent mental model of the scoped Machine.

A Course is not complete merely because text, visual assets, interactions, and
a tutor exist. Completion requires those parts to form one coherent, executable,
validated, attributable, and maintainable learning experience.

## Pipeline principles

### Learning governs production

Models, geometry, animation, explanation, interaction, and tutor behavior exist
to build understanding. Technical possibility or visual appeal is not a
sufficient inclusion criterion.

### Domain understanding precedes simplification

The project investigates how the selected Machine Variant works before deciding
which detail the learner needs. Simplification without prior understanding can
create false explanations.

### The complete learning path precedes expensive assets

Scope, decomposition, knowledge, educational sequence, assembly sequence, and a
complete low-fidelity prototype precede definitive production.

### Every stage produces verifiable output

Elapsed time does not complete a stage. A stage completes when required outputs
exist and its gate is supported by evidence.

### Defects return to their cause

If a Lesson is confusing because the Machine was decomposed poorly, correct the
decomposition. Do not hide the cause beneath more explanation, animation, or
special-case code.

### Reuse carries evidence and scope

Concepts, Components, Relations, terminology, representations, interactions,
and checks may be reused after validation. Reuse does not transfer validity to
a new Machine Variant automatically.

### The first version is complete but bounded

The first Course should tell a complete functional story with the smallest
scope that preserves educational value. Small scope does not lower the quality
gate or the depth of investigation.

### Gate decisions are attributable

Every gate decision records owner, reviewers, evidence, accepted risk, exact
artifact revisions, and reason. A gate can be reopened by new evidence.

## General flow

```text
1. Propose and select a Machine
   -> 2. Scope and research one Machine Variant
   -> 3. Decompose Components and Relations
   -> 4. Build the Knowledge Graph slice
   -> 5. Design the educational path
   -> 6. Design the assembly sequence
   -> 7. Test the complete Course at low fidelity
   -> 8. Produce semantic representations and interactions
   -> 9. Author educational content and checks
   -> 10. Prepare and evaluate the tutor
   -> 11. Compile and integrate the Course
   -> 12. Validate complete quality
   -> 13. Pilot with representative learners
   -> 14. Release an exact revision
   -> 15. Observe, maintain, and improve
```

Every arrow is a quality gate. The pipeline is not a rigid one-way chain; new
evidence can return work to the earliest stage whose assumptions changed.

## Course lifecycle states

| State | Meaning |
| --- | --- |
| `PROPOSED` | A candidate idea exists but has not passed selection. |
| `SELECTED` | Educational value and preliminary feasibility justify research. |
| `IN_RESEARCH` | Variant, boundary, function, evidence, and uncertainty are being established. |
| `IN_DESIGN` | Machine Model, knowledge, learning path, and assembly path are being designed. |
| `IN_PRODUCTION` | Approved representations, content, interaction, and tutor artifacts are being produced. |
| `INTEGRATED` | All required parts exist in one executable candidate build. |
| `IN_VALIDATION` | The complete candidate is undergoing required review and testing. |
| `RELEASE_CANDIDATE` | Mandatory gates are satisfied and only governed final corrections remain. |
| `RELEASED` | An identified Course revision is available to learners. |
| `UNDER_REVIEW` | New evidence requires review or revalidation of a released revision. |
| `WITHDRAWN` | The revision is no longer offered but its history and evidence are preserved. |

A Course revision has one primary lifecycle state at a time. A defect can move
work to an earlier pipeline stage without erasing history.

## Responsibilities

Responsibilities are semantic roles, not required job titles. One person may
hold several roles, especially early in the project.

| Responsibility | Governs |
| --- | --- |
| Course Owner | Purpose, scope, priorities, risk, gate readiness, and final advancement recommendation. |
| Domain Reviewer | Machine function, evidence quality, terminology, variant boundaries, and simplification accuracy. |
| Learning Designer | Outcomes, Chapters, Lessons, objectives, sequencing, checks, and misconception treatment. |
| Interaction Designer | Learner actions, Assembly State, feedback, hint progression, and valid transitions. |
| Representation Author | Semantic geometry, views, animation, perceptual clarity, and visual validation. |
| Author and Editor | Situated explanations, narration, consistency, readability, and evidence-bounded wording. |
| Tutor Research Owner | Context, policy, model behavior, data, evaluation, uncertainty, and failure boundaries. |
| Quality Reviewer | End-to-end verification, defect records, gate evidence, and revalidation coverage. |
| Research and Data Steward | Consent, observation method, provenance, retention, and interpretation boundaries. |

High-risk work should not be approved solely by its author. At minimum, domain
accuracy and complete educational experience require independent review or an
explicitly recorded substitute when independent review is temporarily
unavailable.

## Stage contract

Every stage records:

- entry condition;
- responsible owner;
- exact input revisions;
- required work;
- outputs;
- known uncertainty;
- gate evidence;
- decision and reviewers;
- correction routes;
- downstream invalidations.

---

## Stage 1 — Propose and select a Machine

### Objective

Decide whether a candidate Machine deserves investment in research and course
production.

### Selection questions

- Does the Machine create natural curiosity?
- Can its purpose be expressed clearly?
- Can it be divided into intelligible functional Components?
- Does construction reveal how it works rather than merely reproduce its shape?
- Can progress create meaningful visual and intellectual rewards?
- Is reliable evidence available?
- Can one variant be bounded without distorting its function?
- Does it introduce or reuse concepts valuable to later Courses?
- Is its complexity appropriate for the intended place in the catalog?
- Can the essential Components and Relations be represented?
- Can it exercise the minimum vertical system without demanding a broad generic
  platform first?

### Required work

1. Describe the Machine and purpose in one sentence.
2. Describe the target learner and the question the Course promises to answer.
3. Identify a preliminary set of roughly three to twelve principal Components.
4. Name plausible exact variants rather than evaluating only a broad category.
5. Estimate knowledge, evidence, representation, interaction, safety, and scope
   risks.
6. Compare the candidate with serious alternatives.
7. Recommend selection, deferral, rejection, or a bounded research probe.

### Output

A `CourseProposal` containing:

- Machine category and candidate variants;
- system purpose;
- target learner;
- educational promise;
- preliminary scope;
- tentative principal Components and Relations;
- catalog value and transferable Concepts;
- evidence availability;
- representation and interaction opportunity;
- known risks and unknowns;
- recommendation and rationale.

### Selection gate

Advance when the Machine has clear educational value, a plausibly bounded
variant, sufficient evidence potential, meaningful assembly, and no known
obstacle that makes a complete learning experience implausible.

The gate selects a category for Stage 2 investigation; it does not yet freeze
the final Machine Variant.

---

## Stage 2 — Scope and research the Machine Variant

### Objective

Establish a reliable understanding of the Machine and choose the exact variant,
boundary, operating conditions, and educational depth the Course will teach.

### Scope requirements

Declare:

- exact primary Machine Variant;
- normal function and conditions considered;
- included Components and subsystems;
- environmental elements shown only as context;
- decomposition depth and stopping rationale;
- excluded variants and phenomena;
- phenomena explained without simulation;
- assumed prior learner knowledge;
- safety, ethical, legal, or representation constraints.

### Research coverage

Investigate:

- system purpose and complete functional account;
- Components and subsystems;
- Relations, constraints, flows, and dependencies;
- relevant Materials;
- actual or logical operating sequence;
- design decisions and tradeoffs;
- failures and edge cases that clarify function;
- correct terminology;
- common misconceptions;
- meaningful differences between variants;
- uncertainties that could change Course scope or explanation.

### Evidence requirements

Every material technical Claim is traceable to evidence or qualified expert
validation. Record:

- exact Claim supported;
- source identity, authority, method, and limitations;
- date or revision when relevant;
- variant applicability;
- conflicts with other sources;
- remaining uncertainty;
- review status.

Reference imagery or geometry is not sufficient evidence for hidden function by
itself.

### Output

A reviewed `ResearchDossier`, `MachineVariantRevision`, initial `ClaimSet`,
`EvidenceMap`, and `TerminologySet` containing:

- exact boundary and variant;
- validated functional account;
- vocabulary;
- sources linked to Claims;
- excluded variants and scope;
- uncertainty and risk register;
- domain-review result.

### Research gate

Advance when reviewers can explain the selected variant from input or initial
condition to system result, justify its boundary, trace material Claims, and
distinguish reviewed domain understanding from proposed educational
simplification.

---

## Stage 3 — Decompose the Machine

### Objective

Transform research into a structured Machine Model of Components, Relations,
functions, flows, and justified depth.

### Required work

1. Identify principal Components responsible for system functions.
2. Decompose each Component to the educationally necessary level.
3. Stop when further detail does not improve the declared learning outcome.
4. Record each Component's function and reason for inclusion.
5. Model containment separately from functional Relations.
6. Identify energy, information, material, motion, and control flows.
7. Associate Materials only where they explain function or limitation.
8. Mark optional, variant-specific, external, or excluded Components.
9. Compare the model with the reviewed functional account.
10. Record simplifications, distortions, analogies, and unknowns.

### Rules

- Visual presence alone does not justify a Component's inclusion.
- Every visible authored part has an educational purpose.
- Every important function is attributable to Components and Relations.
- A subcomponent is a recursively contained Component.
- Physical hierarchy does not automatically determine educational sequence.
- A simplification must not create a false causal Relation.
- Logical identity remains distinct from immutable revision identity.

### Output

A reviewed `MachineModelRevision` containing:

- Component hierarchy;
- Component functions and inclusion rationale;
- Component Relations and topologies;
- principal flows and transformations;
- relevant Materials;
- depth boundaries;
- simplification decisions;
- links to Claims and evidence;
- unresolved modeling questions.

### Machine-model gate

Advance when another reviewer can traverse the model and explain how its parts
cooperate to produce the full scoped function without orphan Components,
unassigned functions, contradictory Relations, or unexplained depth.

---

## Stage 4 — Build the Knowledge Graph slice

### Objective

Organize the knowledge required to understand the Machine Variant and make it
traceable and potentially reusable across Courses.

### Required work

1. Convert functions, properties, causes, consequences, and design decisions
   into Knowledge Concepts and scoped Claims.
2. Connect each Concept to the Machine, Component, Relation, Material, or state
   it explains.
3. Define candidate prerequisites and their learner scope.
4. identify reviewed Concepts and Claims that may be reused.
5. Distinguish essential, complementary, enrichment, and out-of-scope knowledge.
6. Attach material Claims to evidence.
7. Record alternative Explanatory Treatments for different depths.
8. Identify Concepts that could transfer to other Machines.
9. Resolve preferred terminology and relevant aliases.

### Control questions

- What must the learner understand to explain the complete function?
- Which Concept makes each important Relation intelligible?
- Which ideas can be shown through the visible Machine?
- Which require analogy, diagram, animation, or other Representation?
- What must be understood before something else?
- What can be omitted without creating a false model?
- Which knowledge is genuinely reusable and under which scope?

### Output

A reviewed `KnowledgeGraphSliceRevision` with Concepts, Claims, terminology,
prerequisites, depth levels, evidence links, explanations, uncertainty, and
cross-Course relationships.

### Knowledge gate

Advance when each important Component and Relation can be explained through
reviewed, evidence-linked Concepts and the necessary knowledge can be ordered
without hidden prerequisite jumps.

---

## Stage 5 — Design the educational path

### Objective

Transform the Machine Model and Knowledge Graph slice into a complete sequence
of understanding.

### Final outcome

Complete a precise form of:

> At the end of this Course, the learner can explain how ______ through the
> cooperation of ______, demonstrated by ______.

The outcome is observable through explanation, prediction, choice,
reconstruction, comparison, or transfer. The verbs “know” and “understand” are
not sufficient without observable evidence.

### Chapter design

Each Chapter represents a coherent combination of:

- important subsystem;
- recognizable function;
- construction stage;
- visible advance toward the complete Machine.

At the end of a Chapter, the learner can explain something they could not
explain at its start.

### Lesson design

Each Lesson declares:

- one primary objective;
- initial and final Assembly State;
- Components and Relations introduced;
- necessary Concepts and prior presentation;
- likely misconception;
- Check Specification;
- dependency on previous Lessons;
- expected cognitive and interaction load.

### Ordering rules

- A new Component answers a visible question.
- Recent knowledge is used before it becomes inert.
- Prerequisites appear before they are required.
- Each explanation can rely on the already constructed state.
- Visual progress remains legible.
- Chapters culminate in recognizable functional results.
- The sequence can revisit earlier Concepts without pretending that one
  presentation guarantees understanding.

### Output

A `CourseBlueprintRevision` containing:

- promise and final outcome;
- target learner and assumed prior knowledge;
- ordered Chapters and Lessons;
- objectives;
- Components, Relations, and Concepts by Lesson;
- dependency graph;
- Check Specifications;
- planned Explanatory Treatments;
- estimated duration as planning information, not a quality gate.

### Educational-design gate

Advance when there are no Lessons without objectives, Components without an
educational moment, Concepts introduced after they are needed, unprepared jumps
in complexity, or critical outcomes without a way to gather evidence.

---

## Stage 6 — Design the assembly sequence

### Objective

Define exactly what the learner does and how each action contributes to
understanding.

### Step specification

Each Assembly Step declares:

- prior Assembly State;
- protagonist Component or Relation;
- visible, hidden, available, and selected Components;
- expected learner action;
- valid placement, orientation, connection, or reasoning criteria;
- permitted hints and their progression;
- responses to meaningful incorrect attempts;
- resulting visual and semantic change;
- Situated Explanation or Tutor Context transition;
- Concept reinforced;
- continuation condition;
- accessibility alternatives.

### Error design

An incorrect attempt should support reasoning when possible. Feedback may:

- expose a functional incompatibility;
- remind the learner what the Component needs;
- direct attention to a Relation;
- reduce difficulty gradually;
- show a bounded conceptual consequence;
- ask the learner to compare alternatives.

A generic “incorrect” response is inadequate when a meaningful diagnosis is
available. Automatic placement after the first error is not the default because
it can remove the reasoning opportunity.

### Connection specification

Each authored connection declares:

- participating Components;
- valid topology, position, and orientation;
- completion tolerance;
- functional Relation represented;
- literal or simplified status;
- persistence across later Assembly States.

### Output

A complete `AssemblyScriptRevision` and state-transition graph that can be
followed from beginning to end without unresolved production decisions.

### Interaction gate

Advance when every action has educational purpose, every governed placement or
decision can be evaluated, error handling is proportionate, and no step
requires knowledge that has not yet been made available.

---

## Stage 7 — Test the complete Course at low fidelity

### Objective

Expose structural, educational, scope, and interaction failures before
expensive production or broad engine construction.

### Prototype form

The complete Course may use:

- diagrams;
- Component cards;
- sketches;
- primitive geometry;
- paper or clickable states;
- written animation descriptions;
- simulated tutor responses;
- a step-by-step walkthrough.

Visual fidelity is not the object of this stage. Functional completeness and
educational coherence are.

### Required work

1. Walk through the complete Course as a new learner.
2. Ask another person to predict where and why each Component belongs.
3. Record points that require unavailable knowledge.
4. Detect repetitive, irrelevant, ambiguous, or disproportionate steps.
5. Verify that each Chapter creates intellectual and perceptual payoff.
6. exercise Check Specifications.
7. Test hint and error progression.
8. Revisit scope and remove detail that does not contribute.
9. Record observations separately from interpretations.

### Output

A versioned `PrototypeSession` set containing exact prototype revision,
participant context, observation method, Observation Records, interpretations,
defects, and prioritized corrections.

### Prototype gate

Definitive production should begin only after a person outside the design work
can traverse the complete prototype, understand its logic, and reach the final
outcome with proportionate support.

The gate also requires that unresolved prototype defects are classified by
their earliest causal stage.

---

## Stage 8 — Produce representations and interactions

### Objective

Create reviewed semantic representations and interaction realizations required
by the validated prototype.

### Production inventory

Before production, create a `ProductionInventory` of
`RepresentationRequirement` and `ProductionItem` records covering:

- Machines and Components requiring Representation;
- visual and semantic states;
- connection points and topology;
- animation and causal overlays;
- Camera Intent;
- cutaways, transparency, enlargement, or distortion;
- geometry source and provenance;
- validated references;
- candidate reusable elements;
- owner, status, review, and dependency.

### Representation requirements

Each Representation should:

- preserve consistent semantic identity;
- preserve proportions relevant to understanding;
- declare omitted, exaggerated, or transformed detail;
- distinguish adjacent Components when educationally necessary;
- make important Relations perceptible;
- match the exact researched Machine Variant;
- bind geometry and interaction to stable semantic entities.

### Animation and camera

Animation and Camera Intent derive from the approved educational and assembly
scripts. Each has an explicit purpose.

Reject or revise work that:

- only decorates;
- suggests false behavior;
- hides the important Relation;
- causes avoidable spatial disorientation;
- adds realism without improving understanding;
- cannot be traced to a semantic state or educational need.

### Assembly validation

Before approving a Production Item, verify that:

- the Component is selectable and recognizable;
- orientation is intelligible;
- valid placement and connection work under declared tolerances;
- invalid intersections or obstruction are prevented or explained;
- final placement matches the Machine Model;
- the Component remains legible in the complete assembly;
- accessibility modes preserve essential meaning.

### Output

A reviewed `RepresentationSetRevision`, interaction realizations, semantic
bindings, and completed Production Inventory ready for compilation.

### Visual and interaction gate

Advance when every required Production Item exists or has an accepted
substitute, represents the Machine accurately within declared simplification,
and supports the assembly sequence without avoidable ambiguity.

---

## Stage 9 — Author educational content and checks

### Objective

Transform reviewed knowledge into concise, timely, situated explanations,
feedback, terminology, and Check Realizations.

### Lesson content

A Lesson may require:

- framing question;
- Component and Relation explanations;
- assembly instruction;
- error feedback and hints;
- animation narration;
- recap and connection to the system;
- Check Realizations;
- contextual glossary;
- internal evidence references.

### Editorial rules

- Begin from what the learner can observe.
- Introduce technical terminology when it improves precision.
- Distinguish literal fact, simplification, analogy, and uncertainty.
- Exclude interesting material that does not serve the current objective.
- Use controlled terminology consistently.
- Connect explanations to visible or previously presented entities.
- Prefer causes and Relations to disconnected facts.
- Do not claim beyond the supporting evidence.
- Keep authored explanation distinct from runtime Tutor Proposals.

### Checks

Check Realizations should gather the reasoning evidence declared by their Check
Specifications. Prefer tasks that require justification, prediction,
comparison, reconstruction, or explanation over name recall when the objective
is relational understanding.

### Review

Each relevant content item receives scoped review:

1. domain precision;
2. pedagogical fit;
3. editorial clarity and terminology;
4. in-experience timing and competition with action;
5. accessibility when applicable.

Record reviews as `ContentReview` records tied to exact revisions and scope.

### Output

Complete, traceable, internally consistent content and Check Realizations bound
to exact Course states.

### Content gate

Advance when content is evidence-bounded, sufficient for progression, aligned
with the target learner, consistent in terminology, and does not compete with
the learner's primary action.

---

## Stage 10 — Prepare and evaluate pedagogical intelligence

### Objective

Enable the tutor to respond from the learner's exact situation within Course,
knowledge, safety, and progression boundaries.

### Required context

For every relevant moment, the system can identify:

- exact Course, Chapter, Lesson, and Assembly Step revisions;
- current objective;
- Assembly State and authorized session state;
- visible, available, selected, and placed Components;
- Concepts presented and not yet presented;
- relevant Claims, evidence, and terminology;
- recent attempts and help history;
- permitted response depth;
- policy, model, prompt, retrieval, tool, and memory revisions.

### Expected behavior

The tutor can:

- explain a Component and why it exists;
- connect help to the constructed Machine;
- provide graduated hints;
- answer relevant follow-up questions;
- identify an incorrect premise;
- recognize evidence limits and uncertainty;
- defer future-dependent detail without dismissing the learner;
- invite observation or reasoning before disclosure;
- maintain a distinctive Machines pedagogical character.

### Evaluation cases

Test direct, ambiguous, incorrect-premise, out-of-scope, future-dependent,
uncertain, comparative, adversarial, and nontechnical-language questions.

Verify under declared scenarios and tolerances that the tutor does not:

- invent Components, Relations, Claims, or visible state;
- contradict reviewed Course knowledge;
- describe hidden content as present;
- reveal complete solutions by default;
- use disproportionate depth;
- detach conversation from construction;
- retain or expose data outside policy;
- present generated content as reviewed canonical source.

Include absolute quality floors, declared baselines, regression cases, and
evaluation uncertainty. Model identity alone is not an evaluation result.

### Output

A versioned `TutorBehaviorSpecification`, context-construction contract,
pedagogical policy, model and system manifest, evaluation datasets, results,
known failures, and release constraints.

### Tutor gate

Advance when the complete tutor system behaves correctly and contextually
within required scenarios, fails safely when evidence or capability is
insufficient, preserves progression, satisfies absolute quality floors, and has
no unresolved release-blocking failure.

---

## Stage 11 — Compile and integrate the Course

### Objective

Combine structure, knowledge, representations, interactions, content, checks,
progress, and tutor behavior into one exact executable Course revision.

### Required work

1. Resolve all approved Chapters, Lessons, and Assembly Steps.
2. Bind Components and Relations to Representations and reviewed knowledge.
3. compile initial states, transitions, and completion conditions.
4. Link animation, Camera Intent, explanations, and Check Realizations.
5. Build Tutor Context projections for governed states.
6. Verify Component availability and placement transitions.
7. Verify save, resume, and revision identity.
8. exercise ordinary and error paths.
9. Detect unresolved references, orphan records, invalidated artifacts, and
   hidden one-off behavior.
10. Produce diagnostics and a reproducible or explainably variable build
    manifest.

### Integration rule

The Course should use declared native capabilities and versioned Course source.
When a Lesson needs unique behavior, classify it explicitly as:

- a research experiment intended to discover missing semantics;
- a reusable engine capability candidate;
- a legitimate versioned Course behavior;
- a Course-design defect.

Do not hide special logic in runtime code. Experimental behavior is permitted
when its purpose, containment, evaluation, and replacement condition are
explicit.

### Output

A complete `CourseBuild`, immutable input manifest, compiler diagnostics,
integration report, known-issue set, and `ExecutionIdentity` inputs.

### Integration gate

Advance when the Course can be completed from beginning to end, resumed after
interruption, and exercised through required error routes without impossible
steps, missing references, silent progress loss, or undeclared behavior.

---

## Stage 12 — Validate complete quality

### Objective

Demonstrate that the integrated Course is domain-accurate, educationally
coherent, usable, accessible, resumable, contextually tutored, and attributable
before pilot or release.

### Domain validation

- The exact Machine Variant matches the research scope.
- Components, Relations, functions, and states are correct.
- Simplifications and distortions are justified and declared.
- Material Claims retain evidence and review.
- Qualified domain review covers the complete relevant path.

### Educational validation

- Objectives are observable.
- Complexity increases deliberately.
- Explanations appear when useful.
- Checks gather the intended reasoning evidence.
- The complete path supports an integrated explanation of the Machine.

### Assembly-experience validation

- Components are recognizable.
- Connections and constraints are intelligible.
- Errors produce useful feedback.
- Camera and animation guide attention.
- Required actions do not depend on unguided guessing.

### Progress and continuity validation

- Initial state is correct.
- Every transition unlocks the intended next state.
- Exit and resume preserve durable progress.
- Repeating or revisiting does not corrupt state.
- Completion produces a coherent final state.
- Migration behavior is declared when revisions differ.

### Tutor validation

- Exact state is available.
- Knowledge and terminology are reviewed and scoped.
- Future content is protected unless policy permits it.
- Hints are proportionate.
- Out-of-scope and uncertain questions fail safely.
- Required evaluations are reproducible under the declared system manifest.

### Accessibility and clarity validation

- Essential meaning does not depend only on color, hearing, or one precision
  mode.
- Language is legible and consistent.
- Important actions have sufficient cues.
- Essential content has an appropriate alternative form.
- Interaction does not demand unnecessary motor precision.

### Defect records

Every `DefectRecord` includes:

- exact execution and artifact location;
- observed behavior;
- expected behavior;
- impact on learning or operation;
- severity and priority;
- earliest likely causal stage;
- correction owner;
- invalidated downstream artifacts;
- evidence of revalidation.

### Quality gate

A candidate can proceed to pilot when:

- no known defect prevents completion, understanding, safety, or valid
  observation;
- required domain and educational reviews are accepted;
- tutor floors and mandatory evaluations pass;
- progress and resume work throughout the Course;
- remaining risks are explicit, bounded, attributable, and acceptable for the
  pilot population.

---

## Stage 13 — Pilot with representative learners

### Objective

Observe whether real learners build the intended understanding without relying
on the Course authors.

### Participant design

Select participants similar to the target learner. When useful, include
participants with lower or higher prior knowledge to expose hidden assumptions.
Record inclusion criteria, sample limitations, consent, and privacy conditions.

### Observation targets

- hesitation and decision points;
- order of attempted Components;
- explanations reread or skipped;
- help requests and tutor exchanges;
- repeated errors;
- abandonment, acceleration, and return;
- explanations of Component function and Relations;
- reasoning after configuration changes;
- delayed recall or transfer when the pilot design supports it;
- perception of the final Machine as a related system.

### Post-session prompts

- What did you believe before the Course?
- What do you explain differently now?
- Which Component was hardest to justify?
- When did the system become clearest?
- Which part felt decorative, confusing, or unnecessary?
- Can you explain the Machine without the Representation?
- What would change if a selected Component were removed or altered?

### Interpretation discipline

Completion and elapsed time are insufficient. Fast completion may indicate
clarity or superficiality; slow completion may indicate productive reasoning or
confusion.

Combine:

- attributable Observation Records;
- learner explanations;
- Check Realization results;
- help requests;
- qualitative reports;
- delayed or transfer evidence when methodologically justified.

Keep Observation Records distinct from `LearningInterpretation`. State method,
uncertainty, competing explanations, and sample limits.

### Output

A `PilotDeployment` tied to exact `ExecutionIdentity`, participant and method
records, observations, interpretations, findings, proposed changes, and a
recommendation to release, repeat, or return to an earlier stage.

### Pilot gate

Advance when representative learners can complete the path and provide
sufficient evidence of the essential target reasoning without extraordinary
author assistance. The exact threshold and uncertainty must be declared before
the release decision.

---

## Stage 14 — Release

### Objective

Make an exact, validated, identifiable, recoverable Course revision available
under a governed release policy.

### Release checklist

Confirm:

- exact primary Machine Variant and scope;
- immutable Course revision and build manifest;
- domain, educational, editorial, accessibility, and operational approvals;
- complete Production Inventory;
- tutor system manifest and evaluation result;
- progress, resume, and migration behavior;
- pilot result and limitations;
- accepted known issues;
- maintenance ownership;
- observation and privacy policy;
- rollback, withdrawal, and replacement path.

### Gradual release

When risk justifies it, release first to a bounded population. Expansion depends
on evidence of stability, safety, and educational validity rather than merely a
lack of reports.

### Output

A `CourseRelease` with identity, exact revisions, date, scope, approvals,
accepted risk, observation policy, maintenance owner, and recovery path.

### Release gate

Release occurs only when responsible owners accept the exact revision and its
known evidence, limits, and operational plan. Pilot execution identity is not a
release identity and must not be retroactively treated as one.

---

## Stage 15 — Observe, maintain, and improve

### Objective

Preserve domain accuracy, educational quality, operability, and interpretability
after release.

### Maintenance signals

- repeated tutor questions;
- frequent error at one Assembly Step;
- concentrated abandonment;
- explanations requiring disproportionate help;
- new evidence or changed sources;
- Representations producing incorrect interpretations;
- unexpected differences between learner populations;
- reusable Concepts or patterns discovered across Courses;
- runtime, accessibility, compatibility, or rights changes;
- exit exercises revealing dependency risk.

### Change classes

| Class | Example | Earliest likely revalidation |
| --- | --- | --- |
| Editorial | Clarify wording without changing meaning. | Editorial and in-experience review. |
| Educational | Change explanation, hint, check, or Lesson order. | Learning design and downstream stages. |
| Structural | Change Components, Relations, Chapters, or assembly sequence. | Machine Model or educational design. |
| Domain correction | Correct a Claim, function, Relation, or Representation. | Research and all dependent stages. |
| Platform evolution | Adopt a new native capability or runtime contract. | Architecture, compilation, integration, and affected quality lines. |
| Tutor-system change | Change model, policy, retrieval, memory, data, or evaluation. | Tutor specification and full required evaluation suite. |

### Revalidation rule

Every change returns to the earliest stage whose authoritative input changed,
then selectively revalidates all impacted downstream artifacts. Impact analysis
must account for exact revision and release history.

### Output

A new Course revision, governed correction, withdrawal, or no-change decision
with evidence, impact analysis, repeated validations, migration plan, and
preserved prior history.

---

## Quality-gate summary

| Gate | Governing question | Minimum evidence |
| --- | --- | --- |
| Selection | Is this Machine worth investigating as a Course? | Compared proposal, variants, promise, scope, evidence potential, and risks. |
| Research | Do we know the exact variant, function, and uncertainty? | Claims, sources, boundary, terminology, and domain review. |
| Machine Model | Do all included parts and Relations make functional sense? | Component hierarchy, functions, Relations, flows, depth, and simplifications. |
| Knowledge | Can essential ideas be explained without hidden jumps? | Concepts, prerequisites, Claims, evidence, and terminology. |
| Educational design | Is there a complete progression of observable understanding? | Chapters, Lessons, objectives, dependencies, and Check Specifications. |
| Interaction | Does every action teach and have evaluable semantics? | Assembly script, state graph, feedback, and connection contracts. |
| Prototype | Does the complete path work before expensive production? | Observed low-fidelity sessions and corrected defects. |
| Production | Do representations and interactions faithfully realize intent? | Production Inventory, semantic bindings, reviews, and assembly tests. |
| Content | Are explanations and checks correct, timely, and traceable? | Scoped domain, pedagogical, editorial, and in-experience reviews. |
| Tutor | Does pedagogical intelligence act from exact governed context? | System manifest, datasets, floors, evaluations, and known failures. |
| Integration | Does one exact build complete, resume, and diagnose correctly? | End-to-end execution, manifest, diagnostics, and error-path verification. |
| Quality | Is the candidate ready for responsible observation with learners? | Complete validation with no pilot-blocking defects. |
| Pilot | Do representative learners produce the intended evidence? | Attributable observations, bounded interpretations, and threshold decision. |
| Release | Is the exact revision responsibly releasable and recoverable? | Approvals, identity, accepted risk, maintenance, and recovery plan. |

No gate is approved by intuition alone. Early evidence can be lightweight, but
it must be explicit, attributable, and sufficient for the risk of advancing.

## Correction loops

| Observed problem | Earliest stage to inspect |
| --- | --- |
| A Component has no clear function | Stage 3, decomposition. |
| An explanation needs too much undeclared theory | Stage 4 or 5, knowledge and learning design. |
| A learner cannot infer where a Component belongs | Stage 6 or 8, assembly intent and Representation. |
| Animation contradicts function | Stage 2, 3, or 8, depending on the causal source. |
| Tutor invents detail | Stage 2, 4, or 10: Claims, knowledge projection, or tutor system. |
| Course needs hidden special-case runtime logic | Stage 6, 11, or architecture capability review. |
| Learners finish but cannot explain | Stage 5, 6, 9, or 13: outcomes, actions, checks, or interpretation. |
| Visual production grows without control | Stage 1, 2, 5, or 8: promise, scope, learning need, or inventory. |
| Progress resumes into an incoherent state | Stage 6, 11, or runtime progress contract. |
| A published Claim loses support | Stage 2 and all dependent stages. |

Returning to an earlier stage preserves quality and reduces long-term cost. It
is not treated as failure when the correction and evidence are recorded.

## Pipeline measures

Metrics are evidence inputs, not isolated verdicts.

### Learning evidence

- proportion and quality of complete functional explanations;
- Components and Relations producing confusion;
- change between prior and subsequent explanations;
- ability to predict consequences of removing or changing a Component;
- help required and its kind;
- delayed retention and transfer when appropriately measured.

### Experience evidence

- progression and abandonment by Chapter and Lesson;
- repeated attempts at one Step;
- help requests and tutor paths;
- successful resume;
- observed disorientation;
- reported clarity, curiosity, and discovery.

### Production evidence

- elapsed effort by stage;
- rework and causal stage;
- reused artifacts and revalidation cost;
- defects found before and after release;
- recurring pipeline bottlenecks;
- maintenance and migration cost;
- degree of hidden manual work.

### Tutor evidence

- evidence-grounded correctness;
- context alignment;
- graduated hint usefulness;
- safe behavior outside scope;
- regression and contradiction rates;
- contribution under declared comparison or ablation design;
- uncertainty and failure coverage.

No single metric determines Course quality. Interpretation combines quantitative
signals, qualitative observation, domain review, and declared uncertainty.

## Scope and efficiency rules

### Pause before production

Pause or redesign a proposal when:

- no exact variant can be bounded;
- material Claims lack plausible evidence;
- the chosen scope depends on phenomena that cannot yet be explained honestly;
- assembly would be decorative rather than explanatory;
- the Course demands broad platform capability without a clear educational
  reason;
- current cost prevents completion of a useful full path.

### Produce from the semantic center outward

After the complete low-fidelity Course is validated, implement one
representative vertical Lesson through knowledge, assembly, content, tutor,
compilation, runtime, progress, and verification. Use it to expose production
and architecture risks before scaling definitive assets.

The vertical Lesson does not replace the complete low-fidelity prototype.

### Reuse deliberately

Before authoring something new, inspect whether a suitable Concept, Component,
Material, Relation, terminology term, interaction pattern, Representation,
animation, or Check Specification already exists. Reuse only with scope review,
provenance, and revalidation.

Measure reuse by reduced work and maintained quality, not by raw artifact count.

## Failure patterns to resist

- Producing geometry before scope and function are known.
- Copying a visual decomposition without validating causality.
- Organizing Chapters only by physical containment.
- Writing extensive theory before designing learner action.
- Creating animation without declared educational intent.
- Showing a Component that receives no explanation.
- Using recall-only checks for relational objectives.
- Allowing tutor behavior without exact Assembly State.
- Solving a Course need with undocumented one-off code.
- Releasing without complete resume and progress verification.
- Interpreting completion as sufficient learning evidence.
- Keeping a released Course active after material Claims lose support.
- Treating a provisional external tool as a permanent semantic authority.
- Generalizing a Course-specific pattern before another Course challenges it.

## Application to the first reference course

The first Course has an additional responsibility: test the pipeline, semantic
model, Course Factory, and minimum native runtime together.

Select a Machine that is bounded, recognizable, evidence-rich, and visually
intelligible. The purpose is not to demonstrate the future catalog's breadth.
It is to answer:

- Does the Machine decomposition create a strong learning sequence?
- Does assembly produce understanding rather than manipulation alone?
- Can the Course exist as governed source rather than hard-coded behavior?
- Which production stages need native authoring support?
- Which Concepts and artifacts are genuinely reusable?
- What work is hidden by current tools?
- What is the minimum complete runtime and compiler capability?
- How much effort does excellent production and maintenance require?

The complete Course first exists at low fidelity. Machines then builds only the
minimum vertical native capability required to execute and study that validated
path.

Technical execution alone does not make the reference course successful.
Representative learners must produce evidence that they can construct and
explain the Machine within the declared outcome and uncertainty.

## Current pipeline position

The project is before the Stage 1 gate. The immediate next decision is selection
of the reference Machine category, followed by selection and bounding of one
exact Machine Variant.

## Completion criterion for pipeline definition

The pipeline is sufficiently defined for reference-course work when
collaborators can:

- explain how a proposal becomes a maintained release;
- identify required output and gate evidence for every stage;
- decide advancement without relying on undocumented intuition;
- trace a defect to its earliest causal stage;
- assign responsibilities even when one person holds several roles;
- prototype the complete path before expensive production;
- validate domain, learning, interaction, tutor, accessibility, and progress;
- preserve exact revision and evidence through release and maintenance;
- measure whether the next Course becomes more reliable and more expressive;
- use pipeline evidence to revise architecture rather than forcing Courses into
  speculative abstractions.

The architecture, Course Factory, compiler, runtime, knowledge systems,
pedagogical intelligence, and release systems exist to serve this pipeline and
its learner outcome.
