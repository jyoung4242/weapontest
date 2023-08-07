//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import grenade from "../Assets/grenade.png";
import Chance from "chance";
import { Box } from "detect-collisions";

export class grenadeEntity {
  static create(index: number, level: number, startingPoint: Vector) {
    let chance = new Chance();
    let xpos = chance.integer({ min: -6, max: 6 });

    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "grenade" },
        collider: { data: new Box({ x: startingPoint.x, y: startingPoint.y }, 12, 18, { isCentered: true, isTrigger: true }) },
        orientation: 0,
        grenadeState: { index, level },
        position: startingPoint,
        velocity: new Vector(xpos, -15),
        zindex: 2,
        sprites: [
          {
            src: grenade,
            size: [12, 18],
            angle: 0,
            offset: [-6, -9], //centers on entity
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}
