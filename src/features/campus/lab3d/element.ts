import * as THREE from "three";

import { labById } from "@/content/labs";
import { SAGE_DEEP } from "./helpers";
import { roomBuilders } from "./rooms";

const CSS = `
:host{display:block;position:relative;width:100%;height:100%;overflow:hidden;
  border-radius:20px;background:#0b132b;font-family:'Hanken Grotesk',system-ui,sans-serif}
canvas{display:block;width:100%;height:100%;cursor:grab;touch-action:none}
canvas.drag{cursor:grabbing}
.hs{position:absolute;transform:translate(-50%,-50%);pointer-events:auto;cursor:pointer;z-index:3}
.dot{width:30px;height:30px;border-radius:99px;border:2px solid #fff;
  background:rgba(36,56,106,.94);box-shadow:0 6px 18px rgba(11,19,43,.5);
  display:grid;place-items:center;color:#fff;font-weight:800;font-size:14px;
  transition:transform .18s ease-out,background .18s ease-out}
.hs:hover .dot,.hs.on .dot{transform:scale(1.18);background:#c4573a}
.dot::after{content:'';position:absolute;inset:-9px;border-radius:99px;
  border:1.5px solid rgba(255,255,255,.5);animation:p 2.6s ease-out infinite}
@keyframes p{0%{transform:scale(.7);opacity:.9}70%{transform:scale(1.35);opacity:0}100%{opacity:0}}
@media (prefers-reduced-motion: reduce){.dot::after{animation:none}}
.card{position:absolute;left:50%;transform:translate(-50%,10px);top:38px;width:250px;
  background:#fff;border-radius:14px;padding:14px 16px;box-shadow:0 18px 44px rgba(11,19,43,.34);
  opacity:0;pointer-events:none;transition:opacity .2s ease-out,transform .2s ease-out}
.hs.on .card{opacity:1;transform:translate(-50%,0);pointer-events:auto}
.card h4{margin:0 0 5px;font-size:15px;font-weight:800;letter-spacing:-.02em;color:#0f1b2d}
.card p{margin:0;font-size:12.5px;line-height:1.5;color:#475569}
.hint{position:absolute;left:16px;bottom:14px;z-index:4;display:flex;gap:8px;align-items:center;
  color:rgba(255,255,255,.82);font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
.load{position:absolute;inset:0;display:grid;place-items:center;color:rgba(255,255,255,.75);
  font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;z-index:5;
  transition:opacity .4s ease-out;background:#0b132b}
.load.gone{opacity:0;pointer-events:none}
`;

class Lab3D extends HTMLElement {
  static get observedAttributes() {
    return ["lab"];
  }

  private _up = false;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private target = new THREE.Vector3(0, 1.2, 0);
  private room!: THREE.Group;
  private spots: { el: HTMLElement; v: THREE.Vector3 }[] = [];
  private th = -0.7;
  private ph = 1.15;
  private rad = 19;
  private idle = 0;
  private _raf = 0;
  private _ro?: ResizeObserver;

  connectedCallback() {
    if (this._up) return;
    this._up = true;
    const r = this.attachShadow({ mode: "open" });
    r.innerHTML = `<style>${CSS}</style><div class="load">Building the room…</div>
      <div class="hint">◐ drag to look around · scroll to zoom · tap a marker</div>`;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    r.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(SAGE_DEEP);
    this.scene.fog = new THREE.Fog(SAGE_DEEP, 26, 46);
    this.camera = new THREE.PerspectiveCamera(46, 1.6, 0.1, 120);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8fa3b8, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 1.05);
    dir.position.set(-9, 12, 7);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    const s = dir.shadow.camera;
    s.left = -14;
    s.right = 14;
    s.top = 14;
    s.bottom = -14;
    s.far = 44;
    this.scene.add(dir);
    const fill = new THREE.PointLight(0xcaf1f1, 0.5, 30);
    fill.position.set(7, 4, 5);
    this.scene.add(fill);

    this.room = new THREE.Group();
    this.scene.add(this.room);
    this._bind();
    this.setLab(this.getAttribute("lab") || "physics");

    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
    this._resize();
    this._tick = this._tick.bind(this);
    this._raf = requestAnimationFrame(this._tick);
    setTimeout(() => r.querySelector(".load")?.classList.add("gone"), 420);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._ro?.disconnect();
    this.scene?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
    this.renderer?.dispose();
  }

  attributeChangedCallback(n: string, o: string | null, v: string | null) {
    if (n === "lab" && o && v && this._up) this.setLab(v);
  }

  private _bind() {
    const el = this.renderer.domElement;
    let px = 0,
      py = 0,
      down = false;
    el.addEventListener("pointerdown", (e) => {
      down = true;
      px = e.clientX;
      py = e.clientY;
      el.classList.add("drag");
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", (e) => {
      if (!down) return;
      this.th -= (e.clientX - px) * 0.006;
      this.ph -= (e.clientY - py) * 0.005;
      this.ph = Math.max(0.42, Math.min(1.48, this.ph));
      px = e.clientX;
      py = e.clientY;
      this.idle = 0;
    });
    const up = () => {
      down = false;
      el.classList.remove("drag");
    };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.rad = Math.max(8, Math.min(27, this.rad + e.deltaY * 0.014));
        this.idle = 0;
      },
      { passive: false },
    );
  }

  setLab(key: string) {
    const lab = labById(key);
    this.room.clear();
    roomBuilders[lab.id](this.room);
    this.shadowRoot?.querySelectorAll(".hs").forEach((n) => n.remove());
    this.spots = lab.hotspots.map((h, i) => {
      const w = document.createElement("div");
      w.className = "hs";
      w.innerHTML = `<div class="dot">${i + 1}</div><div class="card"><h4>${h.t}</h4><p>${h.b}</p></div>`;
      w.addEventListener("click", (e) => {
        e.stopPropagation();
        const wasOn = w.classList.contains("on");
        this.shadowRoot?.querySelectorAll(".hs").forEach((n) => n.classList.remove("on"));
        if (!wasOn) w.classList.add("on");
      });
      this.shadowRoot?.appendChild(w);
      return { el: w, v: new THREE.Vector3(...h.p) };
    });
    this.th = -0.7;
    this.ph = 1.12;
    this.rad = 19;
    this.idle = 0;
    this.dispatchEvent(
      new CustomEvent("labchange", {
        detail: { key: lab.id, meta: lab },
        bubbles: true,
        composed: true,
      }),
    );
  }

  reset() {
    this.th = -0.7;
    this.ph = 1.12;
    this.rad = 19;
  }

  private _resize() {
    const w = this.clientWidth || 800,
      h = this.clientHeight || 500;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private _tick() {
    this._raf = requestAnimationFrame(this._tick);
    this.idle += 1;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.idle > 260 && this.getAttribute("orbit") !== "off" && !reduceMotion) this.th += 0.0011;
    const sp = Math.sin(this.ph);
    this.camera.position.set(
      this.target.x + this.rad * sp * Math.sin(this.th),
      this.target.y + this.rad * Math.cos(this.ph) + 3.2,
      this.target.z + this.rad * sp * Math.cos(this.th),
    );
    this.camera.lookAt(this.target);
    this.renderer.render(this.scene, this.camera);
    const w = this.clientWidth,
      h = this.clientHeight;
    for (const s of this.spots) {
      const p = s.v.clone().project(this.camera);
      s.el.style.display = p.z < 1 ? "block" : "none";
      s.el.style.left = (p.x * 0.5 + 0.5) * w + "px";
      s.el.style.top = (-p.y * 0.5 + 0.5) * h + "px";
    }
  }
}

if (typeof window !== "undefined" && !customElements.get("lab-3d")) {
  customElements.define("lab-3d", Lab3D);
}

export type { Lab3D };
