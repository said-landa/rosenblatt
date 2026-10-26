# 0004 — Select the W1 Pin-Tumbler Reference Course

- Status: Superseded by [Decision 0005](0005-select-reference-padlock-01.md)
- Date: 2026-09-01
- Decided by: Creator

## Decision

The first reference Course will teach the normal keyed operation of a Master
Lock W1 four-pin pin-tumbler cylinder.

The primary Machine Variant boundary contains:

- the cylinder shell;
- the rotatable plug;
- four key pins;
- four driver pins;
- four springs;
- one compatible key;
- the shear-line relation that blocks or permits plug rotation.

It excludes the padlock body, shackle, actuator, and latching mechanism;
manufacturing and servicing; exact proprietary dimensions and keyway geometry;
materials and wear; destructive entry and bypass methods; and claims about
security performance.

Generation 0 targets a curious human without locksmithing
knowledge. Its observable outcome is to explain how the included Components
cooperate to block or permit rotation and predict why one incorrect key height
keeps the cylinder blocked.

## Why now

Machines needs complete Course evidence before it can justify durable engine,
compiler, runtime, representation, or authoring abstractions. The creator has
selected a lock as the first small mechanism and authorized construction rather
than further candidate comparison.

The W1 gives the Course an identified real product family and a four-pin scope
confirmed by Master Lock documentation. The conventional pin-tumbler function
is small, visible in cross-section, causally clear, and rich enough to exercise
component identity, containment, repeated parts, constraints, state change,
prediction, schematic representation, compilation, and deterministic runtime
progress.

## Alternatives considered

### Teach a complete laminated padlock

Deferred because the shackle, latch, actuator, body construction, and cylinder
would combine two mechanisms before the first vertical system is understood.

### Teach a generic pin-tumbler cylinder

Rejected as the primary variant because it would avoid the project's rule that
one Course binds an exact real-world configuration. Conventional sources remain
supporting evidence where W1-specific public documentation is incomplete.

### Teach a combination padlock

Deferred because selector, gate, fence, latch, and shackle variants introduce
more hidden configuration risk than the first Course needs. It remains a useful
contrast candidate for testing promoted abstractions later.

## Consequences

- `machine.master-lock-w1-cylinder` is the one primary Machine Variant for the
  first Course.
- The first representation may be schematic and dimensionally approximate, but
  must not present approximation as exact W1 geometry.
- Course source preserves evidence and review state for material claims.
- The minimum vertical toolchain must validate and compile stable semantic
  identities, execute the ten-step assembly/check path deterministically,
  reject invalid actions, resume compatible progress, and render semantic
  schematic elements.
- Course-specific behavior remains explicit until another complete Course
  demonstrates a reusable native capability.
- The Course does not teach or evaluate unauthorized entry techniques.

## Evidence and uncertainty

Master Lock's technical manual identifies the W1 as a four-pin cylinder used in
No. 1, 3, and 5 laminated padlocks and other products. A published pin-tumbler
patent describes the housing, plug, driver pin, key pin, spring, shear line, and
proper-key alignment mechanism. A Schlage service manual provides an official
conventional exploded view and locked/unlocked cross-section.

The current functional model combines W1-specific pin count with reviewed
conventional pin-tumbler operation. Public evidence has not yet established
every W1-specific internal detail, dimension, material, or revision. No
independent domain reviewer has approved the model. The Generation 0 Course is
therefore an executable hypothesis in `IN_DESIGN`, not a validated or releasable
Course.

## Reversibility and revisit triggers

The selection can be superseded before production investment. Revisit it if:

- direct W1 evidence contradicts the current component or relation model;
- an exact W1 configuration cannot be bounded honestly from available evidence;
- the assembly path proves decorative rather than explanatory;
- the Course cannot tell the complete scoped function without adding the
  padlock actuator or latch;
- representative learners cannot form or demonstrate the intended explanation;
- the mechanism demands broad generic runtime capability before a complete
  low-fidelity path can run.

## Resulting next action

Run and inspect Generation 0 end to end. Correct mechanical, semantic,
educational, and interaction defects before promoting any compiler, runtime, or
representation contract beyond this Course.
