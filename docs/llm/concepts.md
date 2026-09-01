# Conceptual Model

> Audience: LLM collaborators
> Human counterpart: [Concepts](../human/concepts.md)
> Role: rigorous domain vocabulary and invariants

## Purpose and status

This document defines the concepts that exist within Machines and the
relationships between them. It creates a common language for product design,
course production, research, implementation, and future decisions without
confusing educational concepts with representations or technology choices.

This document defines what exists and what it means. It does not prescribe
storage, file formats, services, deployment, or user-interface boundaries.

The model is a current domain contract. It may change through explicit evidence
and decision records. The [architecture](architecture.md) assigns semantic
authority and technical boundaries to these concepts.

## Naming convention

`Machines` is the project and product name. `Machine` is a domain entity. A
lowercase `machine` refers to a real-world system in ordinary prose.

## General map

Machines is organized around five connected conceptual areas:

1. **Machine:** the real system the learner wants to understand.
2. **Course:** the deliberate educational path through which the learner
   constructs and understands one primary machine variant.
3. **Knowledge:** the claims, concepts, relationships, and evidence that explain
   why the machine works.
4. **Experience:** the actions, explanations, and representations that make the
   learning path perceptible and interactive.
5. **Learner:** the person, durable progress, active session, observations, and
   bounded context required to continue.

```text
Learner
  -> follows Course
       -> teaches one primary Machine Variant
            -> contains Component
                 -> may contain Component recursively
            -> is explained through Component Relations

Course
  -> Chapter
       -> Lesson
            -> Assembly Step
                 -> transforms Assembly State

Knowledge Graph
  -> connects claims, concepts, evidence, terms, Machines,
     Components, and Component Relations

Representation
  -> makes a semantic entity or relation perceptible

Tutor Context
  -> projects the exact permitted learning situation
```

---

## The machine domain

### Machine

A `Machine` is a bounded system composed of related parts that cooperate to
perform a function.

It is the object of study behind the learner's question: “How does this work?”

A Machine has:

- a clearly declared purpose;
- a boundary that distinguishes the system from its environment;
- one or more identifiable components;
- functional relationships between those components;
- an outcome produced by their cooperation.

A Machine can be physical, electrical, biological, logical, digital, or hybrid.
Its important parts do not all need to be material or directly visible.

Examples:

- A combination lock converts an aligned configuration into release of a
  constrained mechanism.
- A processor transforms instructions and data through coordinated logical
  components.
- A cell sustains life through structures and processes with related
  functions.

Relationships:

- A Machine has one or more variants.
- A Machine is studied by one or more courses.
- A Machine has representations but is not any representation.
- A Machine is described by claims, concepts, components, and relations.

### Machine Variant

A `MachineVariant` is the exact configuration and boundary selected for study.

The broad category “combination lock,” “electric motor,” or “processor” is not
precise enough for evidence, decomposition, representation, or release. A
variant declares:

- the concrete design or family being modeled;
- normal function and operating conditions;
- included and excluded subsystems;
- relevant configuration and revision;
- meaningful differences from neighboring variants;
- the evidence scope that supports it.

Every course has exactly one `primary_machine_variant_id`. Other Machines or
variants can appear only through an explicit comparison, context, analogy, or
prerequisite role.

### Component

A `Component` is an identifiable physical, logical, biological, digital, or
conceptual part that performs a function within a Machine.

A Component can be:

- an elementary part;
- an assembly of parts;
- a subsystem;
- a physical structure;
- a logical or conceptual element.

Every included Component should answer:

- What is it?
- What function does it perform?
- Why does it exist within this system?
- Which Components does it affect or depend on?
- What would change if it were absent or different?
- What contains it and what does it contain, when relevant?
- Which evidence supports the description?

#### Recursive component hierarchy

A subcomponent is not a different entity type. It is a Component viewed from
the perspective of another Component that contains it.

```text
Machine Variant
  -> Component
       -> Component
            -> Component
```

The hierarchy can continue to the depth needed by the educational objective.
It does not attempt to reproduce all available reality. Decomposition stops
when another level no longer improves the target understanding or is outside
the declared scope.

Containment does not by itself define educational order. A deeply nested
Component may need to appear early if its function makes later structures
intelligible.

Relationships:

- A Component belongs directly to a Machine Variant or another Component.
- A Component may contain zero or more Components.
- A Component may participate in any number of functional relations.
- A Component may use one or more Materials.
- A Component may participate in Assembly Steps and Assembly States.
- A Component may be explained by several Knowledge Concepts.
- A Component may have several Representations.

### Component Relation

A `ComponentRelation` explains how two or more Components cooperate within a
Machine.

Assembly without relationships can produce a recognizable model without
producing understanding. Relations therefore have the same educational
importance as Components.

Candidate relation kinds include:

- attachment, fit, and constraint;
- containment and support;
- motion and transmission;
- energy transfer;
- information transfer;
- material flow;
- control and feedback;
- dependency and enablement;
- protection and isolation;
- transformation.

Every included relation declares:

- participating Components;
- direction, cardinality, or topology when relevant;
- what is transferred, constrained, enabled, or transformed;
- conditions under which it applies;
- why the relation is necessary;
- which system function it helps produce;
- its evidence and uncertainty;
- whether the course presents it literally, approximately, or analogically.

### Material

A `Material` is a substance or composition from which a physical Component is
made.

Material information belongs in a course only when it explains function,
design, behavior, or limitation. It should answer questions such as:

- Why was this material selected?
- Which property enables the Component's function?
- Which constraint or failure mode does it introduce?

A Material can participate in many Components, and a Component can use several
Materials. Material detail should not become encyclopedia content disconnected
from the machine's function.

---

## The educational path

### Course

A `Course` is the complete deliberate path for constructing and understanding
one primary Machine Variant.

The Course transforms machine structure and knowledge into an educational
sequence. It determines what the learner encounters first, what can be
understood at each moment, how complexity grows, and how understanding is
observed.

A Course declares:

- one primary Machine Variant;
- scope and educational depth;
- target learner and assumed prior knowledge;
- final observable learning outcome;
- ordered Chapters, Lessons, and Assembly Steps;
- Components, Relations, and Knowledge Concepts presented;
- checks and evidence requirements;
- completion and resume conditions.

Completing a Course means finishing the declared construction and satisfying
its observable criteria. It does not imply professional mastery of every
discipline related to the machine.

### Chapter

A `Chapter` is a meaningful stage in constructing and understanding the primary
Machine Variant.

A Chapter normally corresponds to:

- an important subsystem;
- a recognizable function;
- a coherent construction stage;
- a visible advance toward the complete system.

Each Chapter should produce a conceptually coherent result. At its conclusion,
the learner should be able to explain a new functional part of the Machine and
how it relates to what was built earlier.

Relationships:

- A Chapter belongs to one Course revision.
- A Chapter contains one or more ordered Lessons.
- A Chapter may focus on several related Components and Relations.
- A Chapter may depend on concepts presented by earlier Chapters.

### Lesson

A `Lesson` is the smallest educational unit with one complete primary learning
objective.

A Lesson introduces only the complexity required to create a comprehensible
advance. It incorporates at least one meaningful Component or Relation and
explains why it exists in the Machine.

A Lesson declares:

- one primary objective;
- initial and final Assembly State;
- one or more ordered Assembly Steps;
- Components and Relations involved;
- required Knowledge Concepts;
- likely misconception or reasoning difficulty;
- one or more proportional checks of understanding.

A Lesson is not defined by a fixed quantity of text, time, or interactions. Its
boundary is the unit of understanding it is intended to build.

### Assembly State

An `AssemblyState` is a semantic snapshot of the constructed Machine at a
declared point in a Course.

It describes relevant facts such as:

- which Components exist in the current experience;
- which are hidden, available, selected, placed, or connected;
- which Relations have been established;
- which configuration and constraints are active;
- which representations and camera intents are appropriate;
- which next actions are valid.

Assembly State is semantic, not merely a saved scene graph. A runtime rendering
is derived from it.

### Assembly Step

An `AssemblyStep` is a concrete learner action that advances construction and
educational state.

It usually discovers, selects, places, connects, configures, or inspects a
Component. It can also focus on a functional Relation between already placed
Components.

Each step declares:

- prior Assembly State;
- protagonist Component or Relation;
- action expected from the learner;
- correct placement, connection, orientation, or decision criteria;
- allowed hints and error responses;
- visible and semantic change;
- associated explanation and Knowledge Concept;
- resulting Assembly State;
- condition for continuation.

An Assembly Step is an interaction, not a complete Lesson. A Lesson can require
several steps to satisfy its objective.

### Check Specification

A `CheckSpecification` declares what reasoning or understanding should become
observable and what evidence would count.

Candidate tasks include:

- explaining why a Component is necessary;
- predicting what changes if it is removed;
- identifying Components that cooperate for a function;
- choosing a connection and justifying it;
- comparing two configurations;
- reconstructing a Relation with reduced support;
- explaining the system in the learner's own words.

A specification declares:

- target objective and concept;
- task and allowed support;
- expected evidence;
- interpretation limits;
- feedback and recovery behavior.

### Check Realization

A `CheckRealization` is the concrete authored or runtime form through which a
Check Specification is presented and evidence is collected.

Separating specification from realization allows the same educational intent
to use different interfaces, accessibility modes, or experimental forms
without losing its meaning.

A quiz is an optional ordered set of Check Realizations. Checks exist to detect
confusion and guide explanation, practice, or continuation—not to manufacture
extrinsic rewards.

---

## Knowledge

### Claim

A `Claim` is a scoped proposition about a Machine, Component, Relation,
Material, behavior, learner task, or educational interpretation.

A Claim declares:

- exact subject and scope;
- wording and qualifiers;
- evidence and source revision;
- review state;
- uncertainty;
- competing or dependent Claims;
- applicability to Machine Variants.

A Claim can be reviewed and authoritative within a scope without being treated
as universal truth. Conflicting Claims may coexist when their sources,
conditions, and interpretations are explicit.

### Evidence Item

An `EvidenceItem` is a source, measurement, expert validation, observation, or
other record used to support, weaken, or contextualize a Claim.

Evidence is not interchangeable. It records source identity, version or date,
method, relevant excerpt or observation, authority, limitations, and
provenance.

A reference image or mesh can support appearance and geometry while remaining
insufficient evidence for hidden function or causal behavior.

### Knowledge Concept

A `KnowledgeConcept` is an idea the learner needs to understand a Machine,
Component, or Relation.

It may describe:

- function;
- principle;
- property;
- cause or consequence;
- phenomenon;
- design decision;
- limitation or failure mode.

Concepts appear when construction makes them useful. A Concept can apply across
several Machines, allowing learning from one Course to support later Courses.

### Knowledge Graph

The `KnowledgeGraph` is the organized set of entities and relations through
which the project can explain Machines.

It connects at least:

- Machines and Machine Variants;
- Components and Component Relations;
- Materials;
- Claims and Evidence Items;
- Knowledge Concepts;
- functions, dependencies, flows, and prerequisites;
- terminology and alternative expressions.

The graph can answer:

- What is this composed of?
- What function does it perform?
- Why is it connected this way?
- Which evidence supports that explanation?
- What must be understood first?
- Where else does this concept apply?
- Which Claims conflict or remain uncertain?

The Knowledge Graph does not determine educational order by itself. It
organizes available reviewed knowledge; a Course selects and orders a scoped
path for a particular learner and outcome.

### Prerequisite

A `Prerequisite` is prior knowledge or capability needed to introduce another
element without creating a hidden learning gap.

Prerequisites may connect Concepts, Lessons, Chapters, or Courses. They should
organize complexity rather than unnecessarily block curiosity. A prerequisite
claim must be testable and may vary by target learner.

### Terminology Term

A `TerminologyTerm` gives a concept a controlled preferred expression within a
declared language, audience, domain, and scope.

It may record:

- preferred and prohibited expressions;
- synonyms and aliases;
- definition;
- source and domain authority;
- translation relationships;
- audience-specific wording;
- applicability by Machine Variant or Course revision.

Terminology is connected to Concepts and Claims rather than embedded as
untracked strings across content.

---

## Experience

### Representation

A `Representation` is a semantic way to make a Machine entity, relation, state,
flow, or concept perceptible for an educational purpose.

A Representation can be visual, spatial, textual, audible, haptic,
diagrammatic, interactive, or mixed. A visual Representation may show:

- form, position, and orientation;
- relative scale;
- assembly state;
- important connections;
- hidden structure through cutaway or transparency;
- causal flow through controlled abstraction.

A Representation is not the Machine and does not own its educational meaning.
The semantic entity retains identity, function, and relationships when its
Representation changes.

Realism is valuable when it improves understanding. Omitted, exaggerated, or
transformed detail is permitted when its educational purpose and distortion are
declared and it does not create a false causal model.

Geometry may be measured, imported, manually authored, generated, or
procedural. Its source does not determine semantic authority; explicit binding,
provenance, and validation do.

### Animation

An `Animation` is a temporal Representation of a meaningful change.

It can:

- show how a Component fits;
- reveal a hidden Relation;
- trace energy, information, motion, or material;
- compare prior and resulting states;
- direct attention toward a function.

An Animation explains a scoped change. It does not imply exhaustive physical
simulation.

### Camera Intent

A `CameraIntent` declares what the learner should perceive spatially and why.

It may require the runtime to:

- focus on a relevant Component;
- prevent occlusion of an action;
- preserve orientation;
- show a Relation from the clearest angle;
- move between detail and system context.

Camera behavior should guide attention without creating avoidable
disorientation or replacing explanation with spectacle.

### Explanatory Treatment

An `ExplanatoryTreatment` is an authored strategy for explaining a Claim,
Concept, Component, Relation, or action to a target learner under declared
conditions.

It can include narrative structure, analogy, examples, sequence, visual intent,
and limits. It remains connected to source Claims and evidence.

### Situated Explanation

A `SituatedExplanation` is a Course-authored explanation bound to an exact
learning state. It communicates:

- what has appeared;
- what function it performs;
- why it is necessary;
- how it relates to what is already constructed.

Text and narration are delivery forms, not independent knowledge. A Situated
Explanation adapts reviewed knowledge to a declared point in a Course.

### Tutor Proposal

A `TutorProposal` is a runtime-generated candidate response, question, hint, or
explanation. It is derived from Tutor Context, course policy, reviewed
knowledge, and model behavior.

It does not become canonical course content merely because it was generated or
shown. It remains attributable to the exact model, policy, context, and
execution identity that produced it.

---

## Learner and evidence

### Learner

A `Learner` is a person who follows one or more Courses to understand Machines.
The Learner observes, asks, assembles, relates, predicts, explains, and retries.

The model should preserve only educationally justified records with explicit
privacy, retention, and interpretation boundaries.

### Course Progress

`CourseProgress` records durable, resumable facts about a Learner's path through
one Course revision.

It may include:

- current Chapter, Lesson, and Assembly Step;
- completion state for governed elements;
- latest valid Assembly State;
- Components made available or placed;
- completed Check Realizations;
- Concepts presented;
- last safe resume point;
- course revision and migration state.

Candidate course-element states are:

- `LOCKED`;
- `AVAILABLE`;
- `IN_PROGRESS`;
- `COMPLETED`.

Candidate Component availability states are:

- `HIDDEN`;
- `AVAILABLE`;
- `PLACED`.

Completion does not equal mastery. Course Progress records governed facts and
does not claim direct access to the Learner's mental state.

### Learner Session State

`LearnerSessionState` records transient execution facts needed by an active
runtime session, such as current selection, temporary camera state, uncommitted
interaction, open tutor exchange, or recoverable local UI context.

It is distinct from durable Course Progress. A session may end without making
every transient fact part of the learner's long-term record.

### Observation Record

An `ObservationRecord` is an attributable record of something observable during
a pilot or execution, such as an action, explanation, hesitation, request for
help, response, error, or evaluator note.

It declares:

- exact Execution Identity;
- relevant semantic entity and course state;
- collection method;
- timestamp or sequence;
- raw or minimally transformed observation;
- consent, privacy, and retention conditions;
- provenance and transformation history.

### Learning Interpretation

A `LearningInterpretation` is a bounded analytical claim derived from one or
more Observation Records.

It declares method, uncertainty, alternative explanations, and evidence. It is
not interchangeable with the observation itself. Completion, time, clicks, or
correct placement alone do not prove understanding.

### Tutor Context

`TutorContext` is a bounded projection of the current educational situation
that allows pedagogical intelligence to respond appropriately.

It derives from:

- Learner and authorized history;
- Course and exact revision;
- current Chapter, Lesson, Assembly Step, and objective;
- Assembly State and transient session state;
- visible, available, selected, and placed Components;
- Concepts already presented and not yet presented;
- relevant Claims, evidence, and terminology;
- recent attempts and immediate question;
- response depth and policy constraints.

Tutor Context is not an independent source of truth. It gathers governed
information so the tutor can act at the correct level without mentioning
hidden Components or unsupported knowledge.

The tutor should:

- act from exact current state;
- connect help to what the Learner can perceive;
- adapt explanation depth;
- ask questions when reasoning is more valuable than disclosure;
- recognize missing evidence and uncertainty;
- preserve progression;
- avoid solving an interaction unnecessarily.

The tutor is not modeled as a generic chatbot detached from the construction
experience.

---

## Principal relationships

| Source | Relation | Target | Rule |
| --- | --- | --- | --- |
| Machine | has | Machine Variant | A variant declares an exact configuration and scope. |
| Machine Variant | contains | Component | One or more Components produce the scoped function. |
| Component | contains | Component | Containment recurses only to useful educational depth. |
| Component | participates in | Component Relation | Every included Relation has functional meaning. |
| Component | uses | Material | Included only when it aids understanding. |
| Course | teaches | Machine Variant | Exactly one primary variant per Course. |
| Course | contains | Chapter | Chapters are ordered. |
| Chapter | contains | Lesson | Lessons are ordered. |
| Lesson | contains | Assembly Step | Each Lesson has one or more steps. |
| Assembly Step | transforms | Assembly State | Every step has an observable and semantic result. |
| Knowledge Concept | explains | Machine, Component, or Relation | Concepts appear when they support understanding. |
| Claim | describes | Semantic entity | Scope, evidence, and uncertainty are explicit. |
| Course | selects and orders | Knowledge Graph | Only knowledge relevant to scope and learner is used. |
| Representation | makes perceptible | Semantic entity or relation | Representation does not own semantic identity. |
| Learner | follows | Course | Each path maintains revision-aware progress. |
| Course Progress | enables | Chapter, Lesson, Step, or Component | Only governed next states become available. |
| Tutor | consumes | Tutor Context | Responses depend on exact authorized context. |
| Observation Record | records | Observable event or statement | Observation remains distinct from interpretation. |
| Learning Interpretation | derives from | Observation Record | Method and uncertainty are explicit. |

## Domain invariants

These rules remain true unless an explicit decision revises the domain model:

1. Every Machine has a purpose, boundary, and related Components.
2. Every Course has exactly one primary Machine Variant.
3. Every shown Component has an explainable function within declared scope.
4. A subcomponent is a recursively contained Component, not a different type.
5. Every included Relation contributes to explaining machine function.
6. Every Chapter produces a coherent functional or structural advance.
7. Every Lesson has one primary objective and a comprehensible result.
8. Every Assembly Step has educational meaning and transforms declared state.
9. Knowledge appears when it supports the Learner's current construction and
   reasoning.
10. Representation may change without changing semantic identity.
11. Animation explains scoped change without implying exhaustive simulation.
12. Course Progress records observable governed facts and is not a guarantee of
    mastery.
13. Tutor behavior derives from exact context, reviewed knowledge, and declared
    policy.
14. Content depth stops when it no longer advances the educational objective.
15. Claims preserve evidence, scope, revision, and uncertainty.
16. Observations remain distinguishable from interpretations.

## Important distinctions

### Machine and Representation

The Machine is the system being studied. A Representation is one way to make it
perceptible.

### Component and rendered object

The Component has identity, function, and Relations. A mesh, scene object,
diagram node, or screen element is a derived Representation.

### Assembly and simulation

Assembly reveals structure and Relations. Simulation attempts to reproduce
behavior under a model. Machines prioritizes the former while allowing scoped
simulation when it serves a declared educational need.

### Course and Knowledge Graph

The graph organizes reviewed knowledge. The Course chooses what to teach, in
which order, through which experience, to which learner.

### Lesson and Assembly Step

A Lesson completes an educational objective. An Assembly Step is one concrete
action within that objective.

### Course Progress and understanding

Progress records governed actions and completion. Understanding is investigated
through explanations, decisions, transfer, and other evidence; it cannot be
reduced to a percentage.

### Session State and Course Progress

Session State is transient execution context. Course Progress is durable,
resumable, revision-aware state.

### Observation and interpretation

An Observation records what was observable. An Interpretation makes a bounded
claim from observations using a declared method.

## Conceptual example: combination lock

```text
Machine: Combination Lock
  Purpose: prevent or allow opening according to a configuration

  Primary Machine Variant:
    Boundary: body, shackle, locking mechanism, and selector mechanism
    Excluded: manufacturing process and destructive bypass methods

  Principal Components:
    - Body
    - Shackle
    - Locking mechanism
    - Combination selector

Course: Combination Lock
  Chapter 1: Body and shackle
    Lesson: What keeps the lock closed
      Step 1: Place the shackle
      Step 2: Connect it to the locking mechanism

  Chapter 2: Combination
    Lesson: How one configuration permits motion
      Step 1: Place the first selector
      Step 2: Relate it to the locking mechanism

Relevant Knowledge Concepts:
  - motion constraint
  - alignment
  - motion transfer
  - locking and release

Tutor Context:
  - exact Course and Lesson revision
  - Components already placed
  - selector currently visible
  - alignment concept already presented
  - Learner question about why the shackle remains constrained
```

This example does not select the first reference course or define final course
content. It demonstrates how the concepts connect.

## Completion criteria for the conceptual phase

The conceptual model is sufficient for the next experiment when collaborators
can:

- use the principal entity names consistently;
- distinguish a Machine, Machine Variant, Course, and Representation;
- describe the Course, Chapter, Lesson, and Assembly Step hierarchy;
- explain how Components, Relations, Claims, Concepts, and evidence connect;
- distinguish progress, session state, observation, and interpretation;
- determine the bounded context required by the tutor;
- detect when a new proposal duplicates or contradicts an existing concept;
- identify which claims are domain contracts and which remain hypotheses.

Storage, tools, services, rendering, and distribution are architectural
decisions and research questions, not conceptual definitions.
