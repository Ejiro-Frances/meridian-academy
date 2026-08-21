import * as THREE from "three";

/* Meridian Academy palette — sage primary, navy ink, clay secondary. Mirrors
   the site's design tokens; slate/glass/metal stay neutral. */
export const C = {
  floor: 0xdfe6ee,
  floor2: 0xc8d3e0,
  wall: 0xf2f6fa,
  bench: 0x1e293b,
  benchTop: 0x334155,
  sage: 0x24386a,
  sagePale: 0xb9d8c2,
  leaf: 0x457c59,
  clay: 0xc4573a,
  clayPale: 0xf5bca6,
  wood: 0xc4573a,
  green: 0x24386a,
  teal: 0x0e9597,
  coral: 0xc4573a,
  white: 0xfdfefe,
  glass: 0xcaf1f1,
  metal: 0x94a3b8,
  dark: 0x0f1b2d,
};

export const SAGE_DEEP = 0x0b132b;

type Opts = {
  rough?: number;
  metal?: number;
  opacity?: number;
  emissive?: number;
  ei?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  cast?: boolean;
  seg?: number;
};

function mat(color: number, o: Opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: o.rough ?? 0.65,
    metalness: o.metal ?? 0.05,
    transparent: o.opacity !== undefined,
    opacity: o.opacity ?? 1,
    emissive: o.emissive ?? 0x000000,
    emissiveIntensity: o.ei ?? 1,
  });
}

export function box(
  g: THREE.Group,
  w: number,
  h: number,
  d: number,
  color: number,
  x: number,
  y: number,
  z: number,
  o: Opts = {},
) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, o));
  m.position.set(x, y, z);
  if (o.rotY) m.rotation.y = o.rotY;
  if (o.rotZ) m.rotation.z = o.rotZ;
  m.castShadow = o.cast !== false;
  m.receiveShadow = true;
  g.add(m);
  return m;
}

export function cyl(
  g: THREE.Group,
  rt: number,
  rb: number,
  h: number,
  color: number,
  x: number,
  y: number,
  z: number,
  o: Opts = {},
) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg || 20), mat(color, o));
  m.position.set(x, y, z);
  if (o.rotZ) m.rotation.z = o.rotZ;
  if (o.rotX) m.rotation.x = o.rotX;
  m.castShadow = o.cast !== false;
  m.receiveShadow = true;
  g.add(m);
  return m;
}

export function sph(
  g: THREE.Group,
  r: number,
  color: number,
  x: number,
  y: number,
  z: number,
  o: Opts = {},
) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 16), mat(color, o));
  m.position.set(x, y, z);
  m.castShadow = true;
  g.add(m);
  return m;
}

/* Shared room shell: floor, two walls, windows, ceiling light rails. */
export function shell(g: THREE.Group, accent: number) {
  const W = 15,
    D = 11,
    H = 4.2;
  const floor = new THREE.Mesh(new THREE.BoxGeometry(W, 0.15, D), mat(C.floor, { rough: 0.9 }));
  floor.position.y = -0.075;
  floor.receiveShadow = true;
  g.add(floor);
  for (let i = -3; i <= 3; i++) {
    box(g, W, 0.02, 0.05, C.floor2, 0, 0.01, i * 1.6, { cast: false, rough: 1 });
    box(g, 0.05, 0.02, D, C.floor2, i * 2.1, 0.011, 0, { cast: false, rough: 1 });
  }
  box(g, W, H, 0.2, C.wall, 0, H / 2, -D / 2, { rough: 0.95, cast: false });
  box(g, 0.2, H, D, C.wall, -W / 2, H / 2, 0, { rough: 0.95, cast: false });
  box(g, W, 0.18, 0.1, accent, 0, 0.09, -D / 2 + 0.14, { cast: false });
  box(g, 0.1, 0.18, D, accent, -W / 2 + 0.14, 0.09, 0, { cast: false });
  for (let i = -1; i <= 1; i++) {
    box(g, 0.06, 1.7, 2.4, C.glass, -W / 2 + 0.11, 2.2, i * 3.1, {
      opacity: 0.55,
      rough: 0.1,
      cast: false,
    });
    box(g, 0.1, 1.9, 0.12, C.white, -W / 2 + 0.13, 2.2, i * 3.1 - 1.25, { cast: false });
    box(g, 0.1, 1.9, 0.12, C.white, -W / 2 + 0.13, 2.2, i * 3.1 + 1.25, { cast: false });
  }
  for (let i = -1; i <= 1; i++) {
    box(g, 4.2, 0.12, 0.5, C.white, i * 4.4, H - 0.25, -1, {
      emissive: 0xffffff,
      ei: 0.6,
      cast: false,
    });
  }
}

export function whiteboard(g: THREE.Group, x: number, z: number, color: number, rotY = 0) {
  const b = new THREE.Group();
  b.position.set(x, 0, z);
  b.rotation.y = rotY;
  box(b, 4.4, 2.1, 0.12, C.white, 0, 2.1, 0, { cast: false });
  box(b, 4.6, 0.14, 0.18, color, 0, 1.02, 0.02, { cast: false });
  for (let i = 0; i < 4; i++)
    box(
      b,
      0.9 + Math.random() * 1.6,
      0.07,
      0.02,
      0x94a3b8,
      -1.2 + (i % 2) * 1.1,
      2.75 - i * 0.34,
      0.08,
      { cast: false },
    );
  g.add(b);
}

export function stool(g: THREE.Group, x: number, z: number, color: number) {
  cyl(g, 0.28, 0.28, 0.1, color, x, 0.78, z);
  cyl(g, 0.06, 0.06, 0.78, C.metal, x, 0.39, z, { metal: 0.7, rough: 0.35, seg: 10 });
  cyl(g, 0.3, 0.3, 0.05, C.metal, x, 0.03, z, { metal: 0.7, seg: 12 });
}

export function benchRun(g: THREE.Group, x: number, z: number, len: number, top: number) {
  box(g, len, 0.85, 1.5, C.bench, x, 0.43, z, { rough: 0.8 });
  box(g, len + 0.14, 0.12, 1.64, top, x, 0.92, z, { rough: 0.45 });
  const n = Math.max(2, Math.round(len / 1.5));
  for (let i = 0; i < n; i++)
    box(
      g,
      len / n - 0.14,
      0.5,
      0.03,
      0x475569,
      x - len / 2 + (len / n) * (i + 0.5),
      0.5,
      z + 0.77,
      { cast: false },
    );
}

export function sink(g: THREE.Group, x: number, z: number) {
  box(g, 0.7, 0.06, 0.55, 0xe1e7f0, x, 0.96, z, { rough: 0.3 });
  cyl(g, 0.03, 0.03, 0.5, C.metal, x, 1.23, z - 0.3, { metal: 0.9, rough: 0.2, seg: 10 });
  cyl(g, 0.03, 0.03, 0.34, C.metal, x, 1.46, z - 0.15, {
    metal: 0.9,
    rough: 0.2,
    seg: 10,
    rotX: Math.PI / 2,
  });
}
