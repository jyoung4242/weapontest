//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import drone from "../Assets/drone-Sheet.png";

const spinningblades = {
  frameRate: 4,
  default: "light",
  sequences: {
    light: [
      [0, 0],
      [16, 0],
      [32, 0],
      [48, 0],
      [64, 0],
      [80, 0],
    ],
  },
};

export class droneEntity {
  static create(index: number, level: number, startingPoint: Vector) {
    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "drone" },
        orientation: 0,
        droneState: { index, level },
        position: startingPoint,
        velocity: new Vector(0, 0),
        sprites: [
          {
            src: drone,
            size: [16, 16],
            angle: 0,
            offset: [-8, -8], //centers on entity
            animation: spinningblades,
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}
