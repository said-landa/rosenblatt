# Machines Mouse: B100 photographic reference

Selected by the creator on 2026-10-05 for the isolated Three.js experiment.
This does not replace Reference Padlock 01 as the Machines-native reference Course.

## Reference identity and evidence

[Xare's iFixit guide 173556](https://www.ifixit.com/Guide/Logitech+B100+Mouse+-+Disassembly/173556)
is the photographic reference: Logitech B100, M-U0026; PCB marking
`Mouton Pixart USB 210-000955 Rev.003`. Inspected on 2026-10-05.
Other B100 PCB revisions are not interchangeable evidence.

| Evidence | Observed features | Reference photograph |
| --- | --- | --- |
| Step 1 | Four feet, central optical opening, accessible rear closure screw | [Underside](https://guide-images.cdn.ifixit.com/igi/gVKQgxLNHIBrYVBB.medium) |
| Steps 3 and 9 | Optical wheel, carrier, two separate springs | [Wheel installed](https://guide-images.cdn.ifixit.com/igi/rISquwPjf63HlRqB.medium) |
| Steps 5 and 9 | Hollow black base, perimeter wall, molded locating features and rear screw boss | [Board lifted](https://guide-images.cdn.ifixit.com/igi/3WkgXvUIkRTcHQny.medium), [Parts](https://guide-images.cdn.ifixit.com/igi/qbQfOnSjrYXGNbF5.medium) |
| Step 6, top | Amber board, front wheel cutout, black switches, metal-capped optical package, rear illumination and cable connector | [PCB top](https://guide-images.cdn.ifixit.com/igi/QT5HgGCG1ZxTs2YZ.medium) |
| Step 6, bottom | Green coating, through-hole joints, traces and clear molded optics | [PCB bottom](https://guide-images.cdn.ifixit.com/igi/ohHrmNQ4kvAIyWcM.medium) |

## Reconstruction limits

`Source/model.js` constructs geometry directly. The photographs establish visible
layout, colors and component families; all internal dimensions, wall thicknesses,
clearances, ribs, spring curves and material parameters are estimates. Approximate
10 mm illustrative units are retained for camera compatibility. No measured CAD,
manufacturing model, exact electrical netlist or validated optics is claimed.

The top-level arrangement now follows this reference instead of the generic green
PCB, separate controller, metal wheel encoder and four PCB screws. The lower shell
has four feet, integrated locating features and one rear closure screw. Underside
routing is still representative rather than a trace-for-trace reproduction;
small component markings and solder details remain simplified. Wheel slots are
visual dark inserts, not geometrically cut openings. The clear optical assembly
uses separate meshes as educational representations; physical part integration
still requires chapter authoring review. Upper button patches are visual regions,
not proof of independently removable buttons.

Chapter 1 retains the three stable lesson identities: molded body, front pair of
feet, rear pair of feet, followed by placing the completed base. Existing local
progress is retained; the refinement does not invent learning activity. You counts
completed subpart lessons and final chapter-placement actions exactly once.

## Inspection and next evidence

`../../evidence/b100-inspection.html` provides developer-only exterior, interior,
base and underside views using the same model. It is excluded from the iOS bundle.
Compare it with the photographs, then review Chapter 1 on physical devices.
The next authoring decision is whether the observed base structure and assembly
interaction are suitable before extending the remaining B100 chapters.

Photographs remain external references; they are not packaged as app artwork.
