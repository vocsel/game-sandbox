import {
  FreeCamera, MeshBuilder, PhysicsImpostor, Vector3,
} from "@babylonjs/core";
import { CAMERA, FIRST_FACE_PLAYER } from "lib/constants";
import { CharacterController } from "./character-controller";

export class FirstFacePlayer extends CharacterController {
  public readonly camera: FreeCamera;

  constructor() {
    super({
      ray: {
        position: new Vector3(0, 3, 0),
        length: 0.5,
      },
    });

    this.camera = this.initializeCamera();
    this.camera.attachControl(true);
    this.player = this.camera;

    this.initCharacter();
  }

  private initializeCamera(): FreeCamera {
    const camera = new FreeCamera("FirstFaceCamera", new Vector3(3.5, 1, 3.5), this.renderer.scene);

    camera.applyGravity = true;
    camera.position = new Vector3(0, 2, 0);
    // camera.rotation = new Vector3(0, Math.PI, 0);

    camera.checkCollisions = true;

    camera.ellipsoid = new Vector3(1, 2, 1);

    camera.minZ = 0.45;
    camera.maxZ = CAMERA.MAXZ;
    camera.speed = FIRST_FACE_PLAYER.SPEED.NORMAL;
    camera.angularSensibility = 2000;

    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);

    return camera;
  }

  async initCharacter() {
    const move = new Vector3(0, 1, 0);

    this.renderer.scene.registerBeforeRender(() => {
      const dt = this.renderer.scene.getEngine().getDeltaTime();

      if (this.leftJoystick?.pressed) {
        move.x = -this.leftJoystick.deltaPosition.x * (dt / 1000) * 20;
        move.z = this.leftJoystick.deltaPosition.y * (dt / 1000) * 20;
      } else {
        move.x = 0;
        move.z = 0;
      }

      if (this.rightJoystick?.pressed) {
        this.camera.rotation.y -= this.rightJoystick.deltaPosition.x * (dt / 1000);
        this.camera.rotation.x -= this.rightJoystick.deltaPosition.y * (dt / 1000);
      }

      const needToJump = this.renderer.inputs.Space;

      const { isGrounded } = this.isGrounded();

      if (needToJump && isGrounded) {
        move.y = FIRST_FACE_PLAYER.JUMP;
      }

      if (!isGrounded) {
        move.y -= dt / 500;
      } else if (!needToJump) {
        move.y = 0;
      }

      this.camera.cameraDirection.y = move.y;
      this.camera.position.x += move.x;
      this.camera.position.z += move.z;
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyQ") {
        const sphere = MeshBuilder.CreateSphere("", { segments: 16, diameter: 1 }, this.renderer.scene);

        sphere.position = new Vector3(
          this.camera.position.x + this.camera.getForwardRay().direction.x,
          this.camera.position.y + this.camera.getForwardRay().direction.y * 3,
          this.camera.position.z + this.camera.getForwardRay().direction.z,
        );
        sphere.checkCollisions = true;
        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1 }, this.renderer.scene);
        sphere.physicsImpostor.setLinearVelocity(
          new Vector3(
            this.camera.getForwardRay().direction.x * FIRST_FACE_PLAYER.THROW_FORCE,
            this.camera.getForwardRay().direction.y * FIRST_FACE_PLAYER.THROW_FORCE,
            this.camera.getForwardRay().direction.z * FIRST_FACE_PLAYER.THROW_FORCE,
          ),
        );
      } else if (["ShiftLeft", "ShiftRight"].includes(e.code)) {
        this.camera.speed = FIRST_FACE_PLAYER.SPEED.FAST;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (["ShiftLeft", "ShiftRight"].includes(e.code)) {
        this.camera.speed = FIRST_FACE_PLAYER.SPEED.NORMAL;
      }
    });
  }
}
