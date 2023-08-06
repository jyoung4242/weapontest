//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import smoke from "../Assets/lasersmoke-Sheet.png";
import { Vector } from "../../_SqueletoECS/Vector";

const burnout = {
  frameRate: 4,
  default: "default",
  sequences: {
    default: [
      [0, 0],
      [8, 0],
      [16, 0],
      [24, 0],
      [32, 0],
      [40, 0],
      [48, 0],
      [56, 0],
    ],
  },
};

export class LaserSmokeEntity {
  static create(position: Vector) {
    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "lasersmoke" },
        position: [position.x, position.y],
        orientation: 0,
        sprites: [
          {
            src: smoke,
            size: [8, 8],
            angle: 0,
            offset: [-4, -4], //centers on entity
            animation: burnout,
            anchor: new Vector(0, 0),
          },
        ],
        zindex: 2,
      },
    });
  }
}
