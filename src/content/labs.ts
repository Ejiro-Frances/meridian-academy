import { z } from "zod";

export const labIds = ["physics", "chemistry", "biology"] as const;
export type LabId = (typeof labIds)[number];

const labSchema = z.object({
  id: z.enum(labIds),
  name: z.string().min(1),
  room: z.string().min(1),
  icon: z.string().min(1),
  blurb: z.string().min(1),
  stats: z.array(z.tuple([z.string().min(1), z.string().min(1)])).length(3),
  hotspots: z
    .array(
      z.object({
        p: z.tuple([z.number(), z.number(), z.number()]),
        t: z.string().min(1),
        b: z.string().min(1),
      }),
    )
    .length(4),
});

export type Lab = z.infer<typeof labSchema>;

/** Display metadata and hotspot copy for the three 3D laboratories. The 3D
 * geometry lives in features/campus/lab3d; this module is the single source
 * for everything textual, so the page (and assistive tech) never depend on
 * WebGL to read it. */
export const labs: Lab[] = z
  .array(labSchema)
  .length(3)
  .parse([
    {
      id: "physics",
      name: "Physics laboratory",
      room: "Block B · Ground floor",
      icon: "magnet",
      blurb:
        "32 workstations, a dedicated optics bay and a mechanics rig wall. Every bench is mains-powered with its own low-voltage supply.",
      stats: [
        ["32", "stations"],
        ["2", "technicians"],
        ["1:16", "ratio at practicals"],
      ],
      hotspots: [
        {
          p: [4.9, 1.7, 0.1],
          t: "Optics bay",
          b: "A 3.4 m steel rail with interchangeable lens carriages and a class-2 laser for refraction and diffraction work.",
        },
        {
          p: [-5.2, 1.9, -4.4],
          t: "Instrument wall",
          b: "Digital oscilloscopes and variable DC supplies, one per four students, calibrated each term.",
        },
        {
          p: [2.2, 2.3, -4.6],
          t: "Mechanics rigs",
          b: "Pendulum and inclined-plane stations used from JSS2 through SS3 coursework.",
        },
        {
          p: [-2.6, 1.3, 1.6],
          t: "Student benches",
          b: "Three runs of eight. Each has its own gas-free power spine and lockable drawer per class arm.",
        },
      ],
    },
    {
      id: "chemistry",
      name: "Chemistry laboratory",
      room: "Block B · First floor",
      icon: "flask-conical",
      blurb:
        "Two island benches, a twin-sash fume cupboard and a locked reagent store. Safety drill runs every first Monday.",
      stats: [
        ["28", "stations"],
        ["2", "fume sashes"],
        ["4 min", "evacuation drill"],
      ],
      hotspots: [
        {
          p: [5.4, 3.2, -2.2],
          t: "Twin-sash fume cupboard",
          b: "Externally vented, airflow-alarmed, and the only place SS3 organic prep happens. Sashes drop automatically on alarm.",
        },
        {
          p: [-7.0, 3.3, 0.6],
          t: "Reagent store",
          b: "Colour-coded and double-locked. A technician signs every bottle in and out — students never handle the store directly.",
        },
        {
          p: [-2.4, 1.7, 0.4],
          t: "Island benches",
          b: "Seven stations per island, four students each, so a full arm of 28 works at once.",
        },
        {
          p: [3.0, 1.7, 4.6],
          t: "Safety station",
          b: "Eyewash, shower, blanket and CO₂ extinguisher within eight steps of every bench.",
        },
      ],
    },
    {
      id: "biology",
      name: "Biology laboratory",
      room: "Block C · Ground floor",
      icon: "microscope",
      blurb:
        "Microscopy rows, a living wall of terraria and a prep room shared with the school farm plot.",
      stats: [
        ["30", "microscopes"],
        ["1", "greenhouse annexe"],
        ["120+", "specimen slides"],
      ],
      hotspots: [
        {
          p: [-3.0, 1.9, 1.4],
          t: "Microscopy rows",
          b: "Thirty binocular microscopes — one per student in an arm, so nobody watches from behind a shoulder.",
        },
        {
          p: [6.9, 3.0, 0.8],
          t: "Living wall",
          b: "Twelve terraria running germination, insect life-cycle and transpiration studies through the term.",
        },
        {
          p: [-5.6, 2.6, -4.9],
          t: "Specimen cabinet",
          b: "Prepared slides, models and preserved specimens, catalogued by syllabus topic.",
        },
        {
          p: [-1.4, 1.6, -4.7],
          t: "Prep bench",
          b: "Where the lab technician sets up dissections and stains before each period.",
        },
      ],
    },
  ]);

export function labById(id: string): Lab {
  return labs.find((l) => l.id === id) ?? labs[0];
}
