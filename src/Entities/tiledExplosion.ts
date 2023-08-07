//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import boom from "../Assets/tileboom.png";

const boomAnimation = {
  frameRate: 4,
  default: "default",
  sequences: {
    default: [
      [0, 0],
      [16, 0],
      [32, 0],
      [48, 0],
      [64, 0],
      [80, 0],
      [96, 0],
      [112, 0],
      [128, 0],
      [144, 0],
      [160, 0],
      [176, 0],
    ],
  },
};

export class tileExplosionEntity {
  static create(startingPoint: Vector) {
    console.log("creating");

    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "tileexplosion" },
        orientation: 0,
        position: startingPoint,
        zindex: 2,
        sprites: [
          {
            src: boom,
            size: [16, 16],
            angle: 0,
            offset: [-8, -8], //centers on entity
            animation: boomAnimation,
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}
