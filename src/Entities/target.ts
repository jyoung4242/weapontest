//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import target from "../Assets/target.png";
import { Box } from "detect-collisions";

export class TargetEntity {
  static create(position: Vector) {
    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "target" },
        collider: { data: new Box({ x: position.x, y: position.y }, 16, 16, { isCentered: true, isStatic: true }) },
        orientation: 0,
        position: [position.x, position.y],
        sprites: [
          {
            src: target,
            size: [16, 16],
            angle: 0,
            offset: [-8, -8], //centers on entity
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}
