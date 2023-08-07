import { Box } from "detect-collisions";
import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { TypeComponent } from "../Components/typeComponent";
import { LevelComponent } from "../Components/level";
import { PositionComponent } from "../Components/positionComp";
import Chance from "chance";
import { tileExplosionEntity } from "../Entities/tiledExplosion";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type uavEntity = Entity & TypeComponent & LevelComponent & PositionComponent;

let chance = new Chance();

export class uavMoveSystem extends System {
  public template = ``;
  public constructor() {
    super("uavMove");
  }

  public processEntity(entity: uavEntity): boolean {
    console.log(entity);

    return entity.type == "uav" && entity.level != null && entity.position != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: uavEntity[]): void {
    entities.forEach((entity, index) => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this

      if (!this.processEntity(entity)) {
        return;
      }
      console.log("here");

      //@ts-ignore
      entity.position = (entity.position as Vector).add(entity.velocity as Vector);
      if (entity.position.x < -60) {
        //entity left screen, remove
        entities.splice(index, 1);
        const randomLocs: Array<Vector> = [];
        setTimeout(() => {
          //pick random spots on map
          switch (entity.level) {
            case 1:
            case 2:
            case 3:
              for (let index = 0; index < 3; index++) {
                randomLocs.push(pickSpot());
              }
              break;
            case 4:
            case 5:
            case 6:
              for (let index = 0; index < 6; index++) {
                randomLocs.push(pickSpot());
              }
              break;
            case 7:
            case 8:
              for (let index = 0; index < 9; index++) {
                randomLocs.push(pickSpot());
              }

              break;
            default:
              break;
          }

          randomLocs.forEach(async loc => {
            //@ts-ignore
            entities.push(tileExplosionEntity.create(loc));
          });
        }, 500);
      }
    });
  }
}

const pickSpot = () => {
  let x, y;
  x = chance.integer({ min: 0, max: 380 });
  y = chance.integer({ min: 0, max: 230 });
  return new Vector(x, y);
};
