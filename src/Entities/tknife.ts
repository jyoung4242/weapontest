//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import { Vector } from "../../_SqueletoECS/Vector";
import knife from "../Assets/tknife.png";
import Chance from "chance";
import { Box } from "detect-collisions";

export class tknifeEntity {
  static create(index: number, level: number, startingPoint: Vector, direction: "up" | "down" | "left" | "right") {
    let myVector: Vector;
    switch (direction) {
      case "up":
        if (index == 0) myVector = new Vector(0, -2.5);
        else if (index == 1) myVector = new Vector(0.75, -2.5);
        else if (index == 2) myVector = new Vector(-0.75, -2.5);
        break;
      case "down":
        if (index == 0) myVector = new Vector(0, 2.5);
        else if (index == 1) myVector = new Vector(0.75, 2.5);
        else if (index == 2) myVector = new Vector(-0.75, 2.5);
        break;
      case "left":
        if (index == 0) myVector = new Vector(-2.5, 0);
        else if (index == 1) myVector = new Vector(-2.5, 0.75);
        else if (index == 2) myVector = new Vector(-2.5, -0.75);
        break;
      case "right":
        if (index == 0) myVector = new Vector(2.5, 0);
        else if (index == 1) myVector = new Vector(2.5, 0.75);
        else if (index == 2) myVector = new Vector(2.5, -0.75);

        break;
      default:
        if (index == 0) myVector = new Vector(0, -2.5);
        else if (index == 1) myVector = new Vector(0.75, -2.5);
        else if (index == 2) myVector = new Vector(-0.75, -2.5);
    }

    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "knife" },
        collider: { data: new Box({ x: startingPoint.x, y: startingPoint.y }, 11, 13, { isCentered: true, isTrigger: true }) },
        orientation: 0,
        grenadeState: { index, level },
        position: startingPoint,
        velocity: myVector,
        zindex: 2,
        sprites: [
          {
            src: knife,
            size: [11, 13],
            angle: 0,
            offset: [-5.5, -6.5], //centers on entity
            anchor: new Vector(0, 0),
          },
        ],
      },
    });
  }
}
