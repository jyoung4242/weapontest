//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import rpg from "../Assets/rpg.png";
import Chance from "chance";
import { Box } from "detect-collisions";

export class rpgEntity {
  static create(index: number, level: number, startingPoint: Vector) {
    let chance = new Chance();
    const randomAngle = chance.integer({ min: 0, max: 359 });
    const xPos = 1 * Math.cos(ang2rad(randomAngle));
    const yPos = 1 * Math.sin(ang2rad(randomAngle));

    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "rpg" },
        collider: { data: new Box({ x: startingPoint.x, y: startingPoint.y }, 16, 8, { isCentered: true, isTrigger: true }) },
        orientation: randomAngle,
        rpgState: { index, level },
        position: startingPoint,
        velocity: new Vector(xPos, yPos),
        zindex: 2,
        sprites: [
          {
            src: rpg,
            size: [16, 8],
            angle: 0,
            offset: [-8, -4], //centers on entity
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}

const ang2rad = (ang: number): number => {
  return ang * (Math.PI / 180);
};
