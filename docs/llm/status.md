# Project State for LLM Collaborators

> Human counterpart: [Current Project Position](../human/status.md)

## State classification

- Project phase: reference-Course Generation 0 implementation and inspection
- Course-pipeline position: Stage 1 selected; Stage 2 evidence and scope remain
  under review; provisional Stage 3–7 artifacts exist but have not passed gates
- Reference Course: normal keyed operation of a four-pin pin-tumbler cylinder
- Primary Machine Variant: Master Lock W1 four-pin cylinder
- General engine: not implemented or specified as final
- Minimum vertical system: compiler/runtime/preview Generation 0 implemented
- Documentation architecture: human/LLM split accepted
- Current highest-leverage decision: whether the complete Generation 0
  functional and learning path is correct enough to validate through prototype
  sessions

## Established contracts

The following directions are sufficiently established to constrain current
planning, while remaining revisable through explicit decisions:

1. Machines teaches one primary machine variant through construction and
   explanation of component relationships.
2. The project optimizes for decades-long depth, educational quality, semantic
   cohesion, and progressive technical sovereignty.
3. The course pipeline contains 15 governed stages from proposal through
   maintenance.
4. A complete low-fidelity reference course precedes general-engine
   construction.
5. Authoring and runtime capabilities derive from a shared semantic substrate.
6. Generic external tools have classified, bounded roles and do not silently
   become semantic authorities.
7. Learner observations, interpretations, session state, and durable progress
   remain distinct.
8. Current architecture and Course Factory boundaries are hypotheses to test,
   not implementation claims.
9. The creator owns Machine, Course, and learner-experience authorship. The LLM
   owns enabling engineering and operations by default and prepares creator
   decision packets only for creator-owned or escalated seams.
10. The production engine foundation is Machines-native. Generic game engines
    cannot host canonical product semantics or become the runtime and authoring
    foundation; lower-level dependencies remain evidence-governed.
11. Decision 0004 selects the Master Lock W1 four-pin pin-tumbler cylinder as
    the first bounded reference Course.

## Current implementation evidence

- `Courses/pin-tumbler-lock/course.json` is canonical authored source for one
  W1 Course revision in `IN_DESIGN`.
- The source includes one Machine Variant, six scoped Component groups, five
  Relations, four Concepts, three Checks, ten ordered Steps, schematic
  representation elements, three Evidence Sources, and five material Claims.
- `MachinesCore` validates semantic identities and references, compiles an
  immutable content-addressed `CourseBuild`, executes deterministic typed
  actions, rejects invalid actions without advancing, records observations, and
  restores progress only against the same Build identity.
- `machines` validates and compiles source from the command line.
- `MachinesCoursePreview` renders the compiled semantic source through a native
  SwiftUI macOS preview. Its Spanish copy and schematic behavior are provisional
  learner-facing proposals awaiting creator review.
- Automated tests cover deterministic compilation, evidence resolution, wrong
  action rejection, wrong-answer rejection, full-path reachability, and
  compatible resumption.
- Computer Use inspection traversed the visible macOS preview through a wrong
  Component, wrong Check answer, authored hint, all ten successful Steps,
  completion, and restart. The locked and aligned shear-line schematics were
  visually inspected. This establishes interface execution only; it is not
  creator acceptance, accessibility validation, or learner evidence.
- `Scripts/package-preview.sh` produces a local derived `.app` bundle so the
  SwiftPM executable can be inspected through macOS accessibility APIs. The
  bundle is not signed, distributed, or treated as a release artifact.
- Swift, SwiftUI, Foundation, and CryptoKit are provisional platform
  dependencies beneath Machines-controlled semantic contracts. No external
  package or generic game engine is present.

## Active unknowns

- Does the public evidence support applying the conventional component and
  shear-line model to the exact W1 configuration without hidden distortion?
- Does the current ten-step path create the intended observable explanation for
  a curious adult with no locksmithing background?
- Which interactions best expose the machine's causal structure beyond the
  current click-to-place Generation 0 proposal?
- What is the minimum vertical engine required by the validated low-fidelity
  path?
- Which candidate semantic entities survive contact with complete course work?
- Where can external instruments accelerate learning without acquiring semantic
  authority?

## Required next evidence cycle

1. Run the compiled Course and inspect every normal, mistaken, help, completion,
   and restart path.
2. Record creator findings about Course meaning, assembly, explanation,
   interaction, Spanish copy, and schematic experience.
3. Obtain independent domain review or record the temporary substitute and
   residual risk.
4. Correct defects at the originating Course pipeline stage.
5. Conduct low-fidelity prototype sessions only after the functional account is
   credible enough to test.
6. Promote no general engine or authoring abstraction solely because it exists
   in Generation 0.

The native-engine destination remains accepted, but the SwiftUI preview and its
schematic primitives are a bounded provisional implementation, not a final
engine architecture or accepted authoring workflow.

## State update rule

At the end of each meaningful cycle, update both this document and the human
counterpart when any of the following changes:

- current phase;
- accepted constraints;
- active decision;
- immediate sequence;
- known evidence or uncertainty;
- implementation or validation status.

Record major choices in `docs/decisions` before treating them as established.
