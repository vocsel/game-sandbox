import {
  Color4,
  GPUParticleSystem, MeshBuilder, ParticleSystem, Scene, Texture, Vector3,
} from "@babylonjs/core";

export default function (scene: Scene) {
  let particleSystem;

  const useGPUVersion = true;

  const fountain = MeshBuilder.CreateBox("foutain", { size: 0.01 }, scene);
  fountain.visibility = 0;
  fountain.position.y = 2200;
  fountain.position.x = -300;
  fountain.position.z = -20;

  const fogTexture = new Texture("https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png", scene);

  if (particleSystem) {
    particleSystem.dispose();
  }

  if (useGPUVersion && GPUParticleSystem.IsSupported) {
    particleSystem = new GPUParticleSystem("particles", { capacity: 10000 }, scene);
    particleSystem.activeParticleCount = 10000;
    particleSystem.manualEmitCount = particleSystem.activeParticleCount;
    const size = 400;
    particleSystem.minEmitBox = new Vector3(-size, 0, -size); // Starting all from
    particleSystem.maxEmitBox = new Vector3(size, 0, size); // To..
  } else {
    particleSystem = new ParticleSystem("particles", 2500, scene);
    particleSystem.manualEmitCount = particleSystem.getCapacity();
    particleSystem.minEmitBox = new Vector3(-25, 2, -25); // Starting all from
    particleSystem.maxEmitBox = new Vector3(25, 2, 25); // To...
  }

  particleSystem.particleTexture = fogTexture.clone();
  particleSystem.emitter = fountain;

  particleSystem.color1 = new Color4(0.8, 0.8, 0.8, 0.1);
  particleSystem.color2 = new Color4(0.95, 0.95, 0.95, 0.15);
  particleSystem.colorDead = new Color4(0.9, 0.9, 0.9, 0.1);
  particleSystem.minSize = 300;
  particleSystem.maxSize = 500;
  particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
  particleSystem.emitRate = 50000;
  particleSystem.blendMode = ParticleSystem.BLENDMODE_STANDARD;
  particleSystem.gravity = new Vector3(0, 0, 0);
  particleSystem.direction1 = new Vector3(0, 0, 0);
  particleSystem.direction2 = new Vector3(0, 0, 0);
  particleSystem.minAngularSpeed = -2;
  particleSystem.maxAngularSpeed = 2;
  particleSystem.minEmitPower = 0.5;
  particleSystem.maxEmitPower = 1;
  particleSystem.updateSpeed = 0.005;

  particleSystem.start();
}
