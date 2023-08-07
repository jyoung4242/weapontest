import { Box } from "detect-collisions";
import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { TypeComponent } from "../Components/typeComponent";
import { tileExplosionEntity } from "../Entities/tiledExplosion";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type flamethrowerEntity = Entity & TypeComponent;

export class ftMoveSystem extends System {
  public template = ``;
  public constructor() {
    super("ftMove");
  }

  public processEntity(entity: flamethrowerEntity): boolean {
    return entity.type == "flamethrower";
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: flamethrowerEntity[]): void {
    entities.forEach((entity, index) => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this

      if (!this.processEntity(entity)) {
        return;
      }
      console.log("noving");

      //@ts-ignore
      entity.position = (entity.position as Vector).add(entity.velocity as Vector);
      //@ts-ignore
      (entity.collider as Box).setPosition(entity.position.x, entity.position.y);
    });
  }
}
