import {
  Color3, Mesh, StandardMaterial, VideoTexture, Texture, DynamicTexture,
} from "@babylonjs/core";
import Renderer from "./renderer";

export function videoPortal(targetMesh: Mesh, streamUrl: string) {
  const renderer = Renderer.shared();

  const mat = new StandardMaterial("m", renderer.scene);
  const texture = new VideoTexture("vidtex", streamUrl, renderer.scene);
  texture.uScale = -1;

  mat.diffuseTexture = texture;
  mat.roughness = 1;
  mat.emissiveColor = Color3.White();

  targetMesh.material = mat;
}

export function imagePortal(targetMesh: Mesh, imageUrl: string) {
  const renderer = Renderer.shared();

  const mat = new StandardMaterial(`mat_${targetMesh.name}`);

  const texture = new Texture(imageUrl, renderer.scene);
  texture.uScale = -1;

  mat.diffuseTexture = texture;

  // const textureCtx = texture.getContext();

  // textureCtx.setTransform(1, 0, 0, -1, 0, 128);
  // textureCtx.setTransform(1, 0, 0, 1, 0, 128);

  targetMesh.material = mat;
}
