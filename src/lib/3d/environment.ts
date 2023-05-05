import {
  HemisphericLight, Mesh, MeshBuilder, PhysicsImpostor, StandardMaterial, Vector3,
  PhysicsHelper, Vector2, Animation,
} from "@babylonjs/core";
import { PhysicsViewer } from "@babylonjs/core/Debug";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { WaterMaterial } from "@babylonjs/materials";
import { CAMERA } from "lib/constants";
import Renderer from "./renderer";
import makeWater from "./water";
import makeFog from "./fog";
import { imagePortal, videoPortal } from "./media-portals";

let physicsViewer; let
  physicsHelper;

function makeSkybox() {
  const renderer = Renderer.shared();

  const SKYBOX_NAME = "skybox";

  const skybox = MeshBuilder.CreateBox(SKYBOX_NAME, { size: CAMERA.MAXZ * 0.99 }, renderer.scene);
  const skyboxMaterial = new StandardMaterial(SKYBOX_NAME, renderer.scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture(SKYBOX_NAME, renderer.scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  return skybox;
}

function makePhysicsObject(newMeshes, scaling = 1) {
  const { scene } = Renderer.shared();
  const physicsRoot = newMeshes[0];

  newMeshes.slice(1).forEach((m) => {
    m.scaling.x = Math.abs(m.scaling.x);
    m.scaling.y = Math.abs(m.scaling.y);
    m.scaling.z = Math.abs(m.scaling.z);
    m.physicsImpostor = new PhysicsImpostor(
      m,
      PhysicsImpostor.MeshImpostor,
      { mass: 0, friction: 0.5, restitution: 0.7 },
      scene,
    );
  });

  physicsRoot.scaling.scaleInPlace(scaling);
  physicsRoot.physicsImpostor = new PhysicsImpostor(
    physicsRoot,
    PhysicsImpostor.NoImpostor,
    { mass: 0 },
    scene,
  );
}

export default async function () {
  const renderer = Renderer.shared();

  const skybox = makeSkybox();
  // makeWater({
  //   scene: renderer.scene,
  //   reflectMeshes: [skybox],
  //   position: new Vector3(0, -10, 0),
  //   size: {
  //     width: 20000,
  //     height: 20000,
  //   },
  // });

  // makeFog(renderer.scene);

  physicsViewer = new PhysicsViewer();
  physicsHelper = new PhysicsHelper(renderer.scene);

  renderer.scene.useRightHandedSystem = true;

  const light = new HemisphericLight("sun", new Vector3(0.5, 0.7, 0), renderer.scene);
  light.intensity = 1.5;
  // var ground = MeshBuilder.CreateGround("Ground", 1, renderer.scene);
  // ground.checkCollisions = true;
  // ground.scaling = new Vector3(300, 1, 300);
  // const mat = new StandardMaterial("mat", renderer.scene);
  // mat.alpha = 0;
  // ground.material = mat;
  // ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, renderer.scene);

  const importedScene = await renderer.importMesh("scene.glb");
  importedScene.meshes.forEach((m) => {
    if (m.name.match(/^cp\..+$/)) {
      const meshNameToCopy = m.name.replace(/^cp\.(.+)(\.\d+)$/, "$1");
      const meshesToCopy: Mesh[] = importedScene.meshes.filter(({ name }) => name.match(new RegExp(`^${meshNameToCopy}`)));

      if (meshesToCopy.length) {
        meshesToCopy.forEach((meshToCopy: Mesh) => {
          const clone = meshToCopy.clone(`${meshNameToCopy}.${Math.random()}`);
          clone.position = new Vector3(m.position.x, m.position.y, m.position.z);
        });
      }

      m.dispose();
    }

    if (m.name.match(/(collidable)/)) {
      m.checkCollisions = true;
    }
  });
  // makePhysicsObject(importedScene.meshes);
  // const display = importedScene.meshes.find(({ name }) => name.match(/^display:main.*/));
  // console.log(display);
  // if (display) {
  //   imagePortal(display as Mesh, "https://net.vocsel.com:8000/file-storage/shared/5e74f2be-dda5-470b-981d-e9dff13b807f/50083-98273-42127-81652-Tracked-Ad-Spot-xl-xl.jpg");
  //   // videoPortal(display as Mesh, "https://net.vocsel.com:8000/file-storage/shared/3ae60884-6a3d-4124-8cc5-569e734bdb4e/mov.mov");
  // }
}
