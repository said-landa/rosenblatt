# Reference Padlock 01 — Preliminary Machine Model

- Machine ID: `machine.reference-padlock-01`
- Revision: `machine.reference-padlock-01@0.1.0`
- State: `IN_DESIGN`
- Authority: creator-selected original reference design

## Boundary

Reference Padlock 01 is a keyed, reusable padlock with a solid rectangular body,
a captive U-shaped shackle, a four-pin pin-tumbler cylinder, a cam, and two
locking balls. A compatible key permits plug rotation; the plug rotates the
cam; the cam gives the balls clearance to disengage from the shackle; the
shackle can then move to its open state.

## Functional component census

| ID | Component or repeated group | Count | Assembly role | Status |
| --- | --- | ---: | --- | --- |
| `body` | Body | 1 | Establishes the main assembly frame and receives all internal subsystems. | Selected; exact construction open. |
| `shackle` | Captive U-shaped shackle | 1 | Enters the body through two interfaces and receives bilateral locking. | Selected; retention open. |
| `cylinder-shell` | Cylinder shell | 1 | Locates the plug and pin chambers in the body. | Functional hypothesis. |
| `plug` | Rotating plug | 1 | Receives the key and drives the cam. | Functional hypothesis. |
| `key-pins` | Key pins | 4 | Assemble into the plug's four pin positions. | Count selected; dimensions open. |
| `driver-pins` | Driver pins | 4 | Assemble above the key pins across the shell/plug boundary. | Count selected; dimensions open. |
| `pin-springs` | Pin springs | 4 | Preload the four pin stacks. | Functional hypothesis. |
| `cam` | Actuator cam | 1 | Couples plug rotation to available ball travel. | Selected; profile open. |
| `locking-balls` | Locking balls | 2 | Assemble between cam and shackle engagement regions. | Selected; paths open. |
| `plug-retainer` | Plug retainer | 1 | Prevents axial withdrawal after plug assembly. | Required role; form open. |
| `shackle-retainer` | Shackle retention feature or Component | 1 | Keeps the open shackle captive. | Required role; identity open. |
| `body-closure` | Body assembly closure | 1 | Permits internal installation and then closes the body. | Required role; form open. |
| `key` | Compatible key | 1 external | Enters the plug and supplies alignment and torque. | External actuator. |

The census distinguishes Components from geometric features. Pin chambers,
ball races, shackle notches, keyway, cam reliefs, and mating datums must be
modeled but are not automatically separate Components.

## Assembly is the explanation

Each accepted placement must create an observable causal difference in the
partial Machine. A step is not complete merely because geometry reaches a
coordinate. It is complete when the new relation changes permitted motion,
constraint, force transmission, or visible state.

The Course will not precede placement with explanatory text. It may use
staging, camera intent, target illumination, motion preview, collision and
constraint response, snap, animation, sound, and haptics to make the next
possibility discoverable.

## First 3D increment

The first increment contains:

1. a body-shaped assembly frame;
2. a parametric round-stock shackle;
3. an exploded starting pose;
4. direct shackle selection;
5. motion constrained to the insertion axis;
6. snap into the seated pose;
7. an observable state transition from `BODY_ONLY` to `SHACKLE_SEATED`;
8. orbit and zoom for spatial inspection.

This increment tests the assembly language and tool boundary. It does not claim
final geometry, final Course ordering, or mechanical completion.
