# Machines Mouse — Nested Assembly Journeys

## Accepted direction — 2026-09-21

The creator requested retaining the existing 14-group general assembly and adding a separate journey into each group. Short explanations and functional animations accompany gradual subassembly. The creator explicitly selected the base first and retained the existing order instead of starting with the wheel.

This is authorization for a bounded prototype, not manufacturing or Course acceptance. Research and creator review determine depth and subpart counts progressively.

## First complete proposal: base

Three subparts reuse the current geometry: molded body, front foot and rear foot. The rim and four board supports are treated as integral features of the body, not independently detachable objects. This is a declared modeling assumption; no specific commercial mouse has been reverse engineered.

The journey allows sequential placement, undo, reset, top/bottom inspection, foot separation and an illustrative sliding demonstration. Brief Spanish copy connects support, table contact and board mounting. Green foot emphasis is an explanatory overlay, not material color evidence. Sliding is kinematic: no friction, force or material simulation is claimed.

The journey owns separate temporary progress. Completion enables adding the base to the general assembly through its existing placement rules. Repeating transfer does not duplicate a placed group. Resetting this journey does not remove an already placed general-assembly group. Progress lasts for the current session only.

## Machines Lab proposals: optics and board — 2026-09-28

The isolated Lab app now continues the accepted order with two reviewable proposals. **Lens and guide** reuses three existing meshes: optical frame, imaging lens and illumination guide. Its animation distinguishes outgoing illumination from the reflected imaging path. The routes are explanatory paths, not computed ray tracing.

**Board** groups its existing geometry into four visible families: board body, four mounting pads, sixteen top-side traces and fourteen vias. These are inspection groups rather than detachable manufacturing layers. Its moving pulse follows one representative trace and via; it is not an electrical netlist, current calculation or timing model.

Each journey has independent temporary progress, undo/reset, separation, top/bottom inspection and transfer through the unchanged general-assembly dependencies. Stable Machines remains at the base-only journey while these two proposals are evaluated in Machines Lab.

## Research and uncertainty

| Source | Supported observation | Boundary |
| --- | --- | --- |
| [Logitech replacement parts](https://www.logitech.com/en-us/shop/c/spare-parts?refine=c_filtersparepartscategories%3Dmice-trackballs-accessories) | Some mice have replaceable feet; replacement configurations vary. | Does not establish this prototype's two-foot count. |
| [Logitech Silent Touch paper](https://www.logitech.com/content/dam/logitech/en/products/combos/mk295-keyboard-mouse-combo/pdf/pattaya-white-paper-edit-20200903.pdf) | Foot materials and low-friction contact influence sliding/noise. | Does not justify assigning a universal material or quantitative friction value. |
| [EP3619597A1 design disclosure](https://patents.google.com/patent/EP3619597A1/en) | Integral molded foot features are an alternative design. | Design variation, not validation of this particular geometry. |
| [PixArt PAW3220 product page](https://www.pixart.com/products-detail/19/PAW3220LU-TJDU) | One optical-sensor architecture specifies a paired lens and discrete infrared LED. | Does not validate this prototype's shapes or optical dimensions. |
| [PixArt PMW3389 product page](https://www.pixart.com/products-detail/4/PMW3389DM-T3QU) | Another architecture integrates the 850 nm light source and still specifies a lens. | Shows architecture variation; it does not identify the modeled sensor. |
| [US7045775B2](https://patents.google.com/patent/US7045775/en) and [US7358958B2](https://patents.google.com/patent/US7358958) | Optical navigation assemblies can use illumination guides, imaging lenses and alignment/light-control features. | Patent embodiments are functional evidence, not a bill of materials for this mouse. |
| [Texas Instruments via guidance](https://www.ti.com/document-viewer/lit/html/SSZTCM4/GUID-17532CA9-A0AF-4401-8383-D3F4AE36A744) | A plated via connects conductive features between PCB layers. | Does not establish this schematic board's stack-up or connectivity. |

## Ordered investigation backlog

No subpart counts below are accepted yet. Each next journey needs geometry mapping, primary evidence, a short functional explanation and creator review before expanding depth.

| Order | Existing group | Next investigation |
| --- | --- | --- |
| 1 | Base | Review body/feet decomposition and contact demonstration. |
| 2 | Lens and guide | Establish distinct optical elements and the illumination/imaging paths. |
| 3 | Board | Distinguish substrate, copper and mounted components; layers are not detachable assembly pieces. |
| 4 | Sensor and light | Identify illumination, imaging and sampling boundaries before animating them. |
| 5 | Electronics | Establish an actual circuit relationship before showing current or signals. |
| 6 | Left switch | Contact, spring and actuator mechanism. |
| 7 | Right switch | Reuse validated mechanism with independent assembly progress. |
| 8 | Wheel support | Separate mechanical support from encoder functions. |
| 9 | Wheel | Tire/body/axle and rotational coupling. |
| 10 | USB cable | Conductors, insulation, connector and strain relief. |
| 11 | Screws | Fastener/contact/thread relationships; avoid invented detachable subparts. |
| 12 | Shell | Integral geometry versus actual separable pieces. |
| 13 | Left button | Actuation and return coupled to the switch. |
| 14 | Right button | Corresponding independent mechanism. |

Animations should expose a causal relationship, remain pausable, and label illustrative models. Electrical flow, digital signaling and mechanical motion must remain distinct. A part may deserve inspection or a manufacturing explanation instead of further detachable pieces.

## Verification boundary

Eight automated tests cover the general assembly, base state, independent Lab journeys and complete optics/board mesh assignment. Browser checks cover both new construction sequences, optical/signal playback, board separation and ordered transfer through 3/14. The offline Lab bundle compiles. Physical touch, device performance, manufacturing fidelity and learning effectiveness remain separate evidence gates.
