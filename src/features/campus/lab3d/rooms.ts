import * as THREE from "three";

import type { LabId } from "@/content/labs";
import { C, benchRun, box, cyl, shell, sink, sph, stool, whiteboard } from "./helpers";

function buildPhysics(g: THREE.Group) {
  shell(g, C.teal);
  whiteboard(g, 0, -5.3, C.teal);
  for (const z of [-1.4, 1.6, 3.6]) {
    benchRun(g, -2.6, z, 7.2, C.benchTop);
    for (let i = 0; i < 4; i++) stool(g, -5.4 + i * 1.9, z + 1.35, i % 2 ? C.teal : C.green);
  }
  // optics bay
  box(g, 3.2, 0.9, 4.6, C.bench, 4.9, 0.45, 1.2, { rough: 0.8 });
  box(g, 3.4, 0.12, 4.8, C.wood, 4.9, 0.96, 1.2, { rough: 0.5 });
  cyl(g, 0.09, 0.09, 3.4, C.metal, 4.9, 1.05, 1.2, {
    metal: 0.8,
    rough: 0.25,
    rotZ: Math.PI / 2,
    seg: 14,
  });
  for (const t of [-1.1, 0.1, 1.3]) {
    cyl(g, 0.34, 0.34, 0.05, C.glass, 4.9, 1.42, 1.2 + t, {
      opacity: 0.6,
      rough: 0.05,
      rotX: Math.PI / 2,
    });
    box(g, 0.34, 0.5, 0.14, C.dark, 4.9, 1.17, 1.2 + t);
  }
  box(g, 0.7, 0.34, 0.5, C.coral, 4.9, 1.28, -1.1); // laser
  // oscilloscope + PSU on rear bench
  box(g, 2.6, 0.9, 1.1, C.bench, -4.6, 0.45, -4.4, { rough: 0.8 });
  box(g, 2.8, 0.12, 1.2, C.benchTop, -4.6, 0.96, -4.4);
  box(g, 1.0, 0.7, 0.7, 0x1e293b, -5.2, 1.37, -4.4);
  box(g, 0.72, 0.46, 0.05, 0xb9d8c2, -5.2, 1.45, -4.06, { emissive: 0x35507f, ei: 0.8 });
  box(g, 0.8, 0.5, 0.6, C.metal, -3.9, 1.27, -4.4, { metal: 0.5 });
  // pendulum rigs
  for (const x of [1.4, 2.6]) {
    cyl(g, 0.05, 0.05, 2.0, C.metal, x, 1.0, -4.6, { metal: 0.8, seg: 10 });
    box(g, 0.9, 0.07, 0.07, C.metal, x + 0.4, 1.98, -4.6, { metal: 0.8 });
    cyl(g, 0.008, 0.008, 1.1, 0x334155, x + 0.8, 1.42, -4.6, { seg: 6 });
    sph(g, 0.13, C.clay, x + 0.8, 0.85, -4.6, { metal: 0.6, rough: 0.3 });
  }
  // inclined plane
  box(g, 2.4, 0.08, 0.6, C.wood, 5.6, 1.55, -3.6, { rotZ: -0.35 });
  cyl(g, 0.18, 0.18, 0.5, C.coral, 5.0, 1.9, -3.6, { rotX: Math.PI / 2 });
}

function buildChemistry(g: THREE.Group) {
  shell(g, C.green);
  whiteboard(g, -4.2, -5.3, C.green);
  for (const z of [0.4, 3.4]) {
    box(g, 8.4, 0.9, 2.0, C.bench, -2.4, 0.45, z, { rough: 0.8 });
    box(g, 8.6, 0.12, 2.2, 0x0f1b2d, -2.4, 0.96, z, { rough: 0.35 });
    for (let i = 0; i < 4; i++) {
      stool(g, -5.6 + i * 2.1, z + 1.6, C.green);
      stool(g, -5.6 + i * 2.1, z - 1.6, C.clay);
      cyl(g, 0.14, 0.2, 0.1, C.dark, -5.6 + i * 2.1, 1.07, z + 0.4, { seg: 12 });
      cyl(g, 0.06, 0.06, 0.4, C.metal, -5.6 + i * 2.1, 1.27, z + 0.4, { metal: 0.7, seg: 10 });
    }
    for (let i = 0; i < 5; i++) {
      const x = -6.2 + i * 1.8;
      cyl(g, 0.06, 0.24, 0.34, C.glass, x, 1.19, z - 0.5, { opacity: 0.5, rough: 0.05 });
      cyl(g, 0.11, 0.11, 0.3, C.glass, x + 0.5, 1.17, z - 0.55, {
        opacity: 0.5,
        rough: 0.05,
        seg: 14,
      });
    }
    sink(g, 1.1, z);
  }
  // fume cupboard
  const f = new THREE.Group();
  f.position.set(5.4, 0, -2.2);
  g.add(f);
  box(f, 2.6, 0.9, 1.5, C.bench, 0, 0.45, 0, { rough: 0.8 });
  box(f, 2.8, 2.4, 1.6, 0xe1e7f0, 0, 2.2, -0.05, { rough: 0.6 });
  box(f, 2.4, 1.3, 0.06, C.glass, 0, 2.05, 0.78, { opacity: 0.4, rough: 0.05 });
  box(f, 2.5, 0.1, 0.16, C.green, 0, 1.35, 0.8);
  cyl(f, 0.16, 0.16, 0.9, C.metal, 0.9, 3.85, -0.05, { metal: 0.6, seg: 12 });
  // reagent shelves
  box(g, 0.5, 0.1, 6.0, C.wood, -7.0, 2.0, 0.6, { cast: false });
  box(g, 0.5, 0.1, 6.0, C.wood, -7.0, 2.7, 0.6, { cast: false });
  for (let i = 0; i < 14; i++) {
    const cols = [C.coral, C.teal, C.clay, 0xf5ecc8, C.green];
    cyl(g, 0.11, 0.13, 0.42, cols[i % 5], -7.0, 2.26, -2.2 + i * 0.42, { seg: 12 });
    if (i % 2 === 0)
      cyl(g, 0.11, 0.13, 0.42, cols[(i + 2) % 5], -7.0, 2.96, -2.2 + i * 0.42, { seg: 12 });
  }
  // eyewash + extinguisher
  cyl(g, 0.1, 0.1, 1.2, C.green, 3.0, 0.6, 4.6, { seg: 12 });
  sph(g, 0.16, 0xe4f1e9, 3.0, 1.26, 4.6);
  cyl(g, 0.17, 0.17, 0.68, C.coral, 6.4, 0.34, 4.4, { seg: 14 });
}

function buildBiology(g: THREE.Group) {
  shell(g, C.clay);
  whiteboard(g, 2.2, -5.3, C.clay);
  for (const z of [-1.6, 1.4, 3.9]) {
    benchRun(g, -3.0, z, 8.0, 0xeef2f7);
    for (let i = 0; i < 5; i++) {
      const x = -6.6 + i * 1.8;
      stool(g, x, z + 1.35, i % 2 ? C.clay : C.sage);
      // microscope
      box(g, 0.34, 0.06, 0.3, C.dark, x, 1.01, z - 0.2);
      box(g, 0.16, 0.5, 0.2, C.dark, x + 0.1, 1.26, z - 0.28);
      cyl(g, 0.07, 0.07, 0.42, C.metal, x - 0.02, 1.5, z - 0.14, {
        metal: 0.7,
        rotZ: 0.25,
        seg: 12,
      });
      cyl(g, 0.05, 0.05, 0.22, C.dark, x - 0.02, 1.13, z - 0.14, { seg: 10 });
    }
  }
  // terraria wall
  for (let i = 0; i < 3; i++) {
    const y = 0.9 + i * 1.1;
    box(g, 0.6, 0.1, 5.0, C.wood, 6.9, y, 0.8, { cast: false });
    for (let j = 0; j < 4; j++) {
      const z = -1.2 + j * 1.3;
      box(g, 0.5, 0.7, 0.9, C.glass, 6.9, y + 0.4, z, { opacity: 0.35, rough: 0.05 });
      sph(g, 0.2, 0x7cb48d, 6.9, y + 0.25, z, { rough: 0.8 });
      sph(g, 0.13, C.leaf, 6.85, y + 0.5, z + 0.2, { rough: 0.8 });
    }
  }
  // specimen cabinet
  box(g, 2.2, 2.3, 0.7, 0xeef2f7, -5.6, 1.15, -4.9, { rough: 0.7 });
  for (let i = 0; i < 5; i++)
    box(g, 2.0, 0.05, 0.06, C.clay, -5.6, 0.45 + i * 0.42, -4.53, { cast: false });
  // prep sink + trays
  box(g, 2.4, 0.9, 1.2, C.bench, -1.4, 0.45, -4.7, { rough: 0.8 });
  box(g, 2.6, 0.12, 1.3, 0xeef2f7, -1.4, 0.96, -4.7);
  sink(g, -1.4, -4.7);
  // potted plants
  for (const x of [4.6, 5.6]) {
    cyl(g, 0.28, 0.2, 0.42, C.clay, x, 0.21, 4.5, { seg: 14 });
    sph(g, 0.42, C.leaf, x, 0.75, 4.5, { rough: 0.85 });
    sph(g, 0.3, 0x7cb48d, x + 0.2, 1.05, 4.35, { rough: 0.85 });
  }
}

export const roomBuilders: Record<LabId, (g: THREE.Group) => void> = {
  physics: buildPhysics,
  chemistry: buildChemistry,
  biology: buildBiology,
};
