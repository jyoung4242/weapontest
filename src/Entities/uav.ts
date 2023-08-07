//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import uav from "../Assets/uav.png";

export class uavEntity {
  static create(index: number, level: number) {
    let myVector: Vector;
    return Entity.create({
      id: uuidv4(),
      components: {
        level: { data: level },
        type: { data: "uav" },
        orientation: 0,
        grenadeState: { index, level },
        position: new Vector(450, 133),
        velocity: new Vector(-10, 0),
        zindex: 2,
        sprites: [
          {
            src: uav,
            size: [48, 48],
            angle: 0,
            offset: [-24, -24], //centers on entity
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}
