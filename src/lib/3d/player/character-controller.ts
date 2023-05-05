import {
  Ray, RayHelper, Vector3, VirtualJoystick,
} from "@babylonjs/core";
import Renderer from "../renderer";

export class CharacterController {
  public player: any;

  public renderer: Renderer;

  protected rayParams: { position: Vector3, length: number };

  protected leftJoystick: VirtualJoystick;

  protected rightJoystick: VirtualJoystick;

  constructor({ ray }: { ray: { position: Vector3, length: number } }) {
    this.renderer = Renderer.shared();
    this.rayParams = ray;

    const isMobile = navigator.userAgentData.mobile;

    if (isMobile) {
      this.leftJoystick = new VirtualJoystick(true);
      this.rightJoystick = new VirtualJoystick(false);
    }
  }

  isGrounded(): { isGrounded: boolean } {
    const origin = new Vector3(
      this.player.position.x,
      this.player.position.y - this.rayParams.position.y - 1,
      this.player.position.z,
    );

    const direction = new Vector3(0, -1, 0);

    const ray = new Ray(origin, direction, this.rayParams.length);

    // const rayHelper = new RayHelper(ray);
    // rayHelper.show(this.renderer.scene);

    const predicate = function (mesh) {
      return mesh.isPickable && mesh.isEnabled() && mesh.id !== "player";
    };

    const hit = this.renderer.scene.pickWithRay(ray, predicate);

    const _isGrounded = !!hit.pickedMesh;

    return { isGrounded: _isGrounded };
  }
}
