//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../_SqueletoECS/entity";
import player from "../Assets/player.png";
import { Vector } from "../../_SqueletoECS/Vector";

export class playerEntity {
  static create() {
    return Entity.create({
      id: uuidv4(),
      components: {
        type: { data: "player" },
        orientation: 0,
        position: new Vector(400 / 2, 266.3 / 2),
        sprites: [
          {
            src: player,
            size: [32, 32],
            offset: [-16, -16],
            angle: 0,
            anchor: [0, 0],
          },
        ],
      },
    });
  }
}
