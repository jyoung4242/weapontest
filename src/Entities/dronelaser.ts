//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import laser from "../Assets/laser.png";
import { Box } from "detect-collisions";

export class droneLaserEntity {
  static create(position: Vector, velocity: Vector, angle: number) {
    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "laser" },
        collider: { data: new Box({ x: position.x, y: position.y }, 5, 15, { isCentered: true, isTrigger: true }) },
        position: [position.x, position.y],
        velocity: [velocity.x, velocity.y],
        orientation: angle,
        zindex: 0,
        sprites: [
          {
            src: laser,
            size: [5, 15],
            angle: 90,
            offset: [-2.5, -7.5], //centers on entity
            anchor: new Vector(2.5, 7.5),
          },
        ],
      },
    });
  }
}
