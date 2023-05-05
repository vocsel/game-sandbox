import {
  ColorMergerBlock,
  Mesh,
  MeshBuilder, Scene, Texture, Vector2, Vector3,
} from "@babylonjs/core";
import { WaterMaterial } from "@babylonjs/materials";

interface IOptions {
  scene: Scene;
  reflectMeshes: Mesh[];
  position?: Vector3;
  size: { width: number; height: number };
}

export default function (options: IOptions) {
  const {
    scene, reflectMeshes, position = Vector3.Zero(), size,
  } = options;

  const waterMesh = MeshBuilder.CreateGround("waterMesh", {
    width: size.width, height: size.height, subdivisions: 64, updatable: false,
  }, scene);

  waterMesh.rotation = new Vector3(Math.PI, 0, 0);
  waterMesh.position = position;
  const water = new WaterMaterial("water", scene, new Vector2(512, 512));
  water.backFaceCulling = true;
  water.bumpTexture = new Texture("waterbump.png", scene);
  water.windForce = -5;
  water.waveHeight = 1;
  water.bumpHeight = 0.1;
  water.windDirection = new Vector2(1, 1);
  water.waterColor = new ColorMergerBlock(0, 0, 221 / 255);
  water.colorBlendFactor = 0.0;
  waterMesh.material = water;

  reflectMeshes.forEach((m) => {
    water.addToRenderList(m);
  });
}
