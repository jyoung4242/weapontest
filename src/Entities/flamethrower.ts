//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import fire from "../Assets/tileboom.png";
import Chance from "chance";
import { Box } from "detect-collisions";

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
      [32, 0],
      [48, 0],
      [64, 0],
      [32, 0],
      [48, 0],
      [64, 0],
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

export class fThrowerEntity {
  static create(index: number, level: number, startingPoint: Vector, angle: number, direction: "up" | "down" | "left" | "right") {
    let chance = new Chance();
    let newAngle = chance.floating({ min: -0.25, max: 0.25 });
    let myVector;
    switch (direction) {
      case "up":
        myVector = new Vector(0, -1.5);
        myVector = myVector.add(new Vector(newAngle, -Math.sin(ang2rad(newAngle))));
        break;
      case "down":
        myVector = new Vector(0, 1.5);
        myVector = myVector.add(new Vector(newAngle, Math.sin(ang2rad(newAngle))));
        break;
      case "left":
        myVector = new Vector(-1.5, 0);
        myVector = myVector.add(new Vector(-Math.cos(ang2rad(newAngle)), newAngle));
        break;
      case "right":
        myVector = new Vector(1.5, 0);
        myVector = myVector.add(new Vector(Math.cos(ang2rad(newAngle)), newAngle));
        break;
    }
    console.log("vector: ", myVector);

    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "flamethrower" },
        collider: { data: new Box({ x: startingPoint.x, y: startingPoint.y }, 16, 16, { isCentered: true, isTrigger: true }) },
        orientation: 0,
        rpgState: { index, level },
        position: startingPoint,
        velocity: myVector,
        zindex: 2,
        sprites: [
          {
            src: fire,
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

const ang2rad = (ang: number): number => {
  return ang * (Math.PI / 180);
};
