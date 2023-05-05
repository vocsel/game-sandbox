import "@babylonjs/loaders/glTF";
import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  Mesh,
  AbstractMesh,
  ActionManager,
  ExecuteCodeAction,
  CannonJSPlugin,
  HavokPlugin,
} from "@babylonjs/core";
import * as cannon from "cannon";
import { getDistance, getFileExtension } from "lib/helpers";
import { ScenePerformancePriority } from "@babylonjs/core/scene";
import HavokPhysics from "@babylonjs/havok";
import { MESH_COLLIDE_DISTANCE, MESH_DRAW_DISTANCE } from "lib/constants";
import { FirstFacePlayer } from "./player/first-face-player";

window.CANNON = cannon;

export default class Renderer {
  public static instance: Renderer;

  public scene: Scene;

  public canvas: HTMLCanvasElement;

  public engine: Engine;

  public player: FirstFacePlayer;

  public objects: Array<Mesh|AbstractMesh> = [];

  public canJump: boolean;

  public inputs: Record<string, boolean>;

  private listeners: Record<string, ((arg: any) => void)[]> = {};

  public static shared() {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }

    return Renderer.instance;
  }

  async init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.engine = new Engine(canvas, true, undefined, false);

    this.scene = new Scene(this.engine);

    // const hkInstance = await HavokPhysics();

    // const hkPlugin = new HavokPlugin(true, hkInstance);
    const cannonPlugin = new CannonJSPlugin();

    this.scene.enablePhysics(null, cannonPlugin);

    this.scene.performancePriority = ScenePerformancePriority[
      process.env.production ? "Intermediate" : "BackwardCompatible"
    ];

    this.setUpCamera();
    this.initPlayer();

    this.inputs = {};
    this.registerInputs();

    if (process.env.NODE_ENV === "debug") {
      this.scene.debugLayer.show({
        embedMode: true,
      });

      this.scene.debugLayer.show();
    }

    return this;
  }

  registerInputs() {
    this.scene.actionManager = new ActionManager(this.scene);

    this.scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (e) => {
      this.inputs[e.sourceEvent.code] = e.sourceEvent.type === "keydown";
    }));

    this.scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (e) => {
      this.inputs[e.sourceEvent.code] = e.sourceEvent.type === "keydown";
    }));
  }

  enableControls() {
    this.scene.onPointerDown = (e) => {
      if (e.button === 0) this.engine.enterPointerlock();
      if (e.button === 1) this.engine.exitPointerlock();

      // this.emitEvent("pointerLock", !e.button);
    };

    const framesPerSecond = 60;

    const gravity = -9.81;

    this.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);

    this.scene.collisionsEnabled = true;
  }

  setUpCamera() {
    this.enableControls();
  }

  initPlayer() {
    this.player = new FirstFacePlayer();
  }

  importMesh(path: string) {
    const ext = getFileExtension(path) || ".glb";

    return SceneLoader.ImportMeshAsync("", "", path, this.scene, undefined, ext);
  }

  run() {
    let lastTime = 0;

    const names = [/Cactus/, /rock/];

    const redrawableMeshes = this.scene.meshes.filter((m) => !!names.find((n) => m.name.match(n)));
    const collidableMeshes = this.scene.meshes.filter((m) => !m.name.match(/^ground/) && m.name.match(/collidable/));

    this.engine.runRenderLoop(() => {
      this.scene.render();

      const t = Date.now();

      if (t - lastTime >= 1000) {
        lastTime = t;

        collidableMeshes.forEach((mesh: Mesh) => {
          const d = getDistance(this.player.camera.position, mesh);

          mesh.checkCollisions = d < MESH_COLLIDE_DISTANCE;
        });

        redrawableMeshes.forEach((mesh: Mesh) => {
          const d = getDistance(this.player.camera.position, mesh);

          mesh.setEnabled(d < MESH_DRAW_DISTANCE);
        });
      }
    });

    window.addEventListener("resize", () => this.engine.resize());
  }

  emitEvent(event: string, value: any): void {
    this.listeners[event].forEach((cb) => cb(value));
  }

  on(event: string, cb: (args: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(cb);
  }
}
