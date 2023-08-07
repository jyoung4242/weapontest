//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import dtoken from "../Assets/rpgtoken-Sheet.png";
import shadow from "../Assets/tokenshadow.png";

const bouncingToken = {
  frameRate: 8,
  default: "light",
  sequences: {
    light: [
      [0, 0],
      [18, 0],
      [36, 32],
      [54, 32],
      [72, 0],
      [54, 0],
      [36, 32],
      [18, 32],
    ],
  },
};

const bouncingShadow = {
  frameRate: 8,
  default: "shrink",
  sequences: {
    shrink: [
      [0, 0],
      [18, 0],
      [36, 0],
      [54, 0],
      [72, 0],
      [54, 0],
      [36, 0],
      [18, 0],
    ],
  },
};

export class rpgToken {
  static create() {
    return Entity.create({
      id: uuidv4(),
      components: {
        position: new Vector(10, 80),
        orientation: 0,
        sprites: [
          {
            src: shadow,
            size: [18, 32],
            angle: 0,
            offset: [-8, -16], //centers on entity
            animation: bouncingShadow,
            anchor: new Vector(0, 0),
          },
          {
            src: dtoken,
            size: [18, 32],
            angle: 0,
            offset: [-8, -16], //centers on entity
            animation: bouncingToken,
            anchor: new Vector(0, 0),
          },
        ],
        type: { data: "token" },
        zindex: 1,
      },
    });
  }
}
