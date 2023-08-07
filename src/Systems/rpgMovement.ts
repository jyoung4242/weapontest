import { Box } from "detect-collisions";
import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { rpgStateComponent } from "../Components/rpgState";
import { TypeComponent } from "../Components/typeComponent";
import { tileExplosionEntity } from "../Entities/tiledExplosion";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type RPGEntity = Entity & TypeComponent & rpgStateComponent;

export class rpgMoveSystem extends System {
  public template = ``;
  public constructor() {
    super("rpgMove");
  }

  public processEntity(entity: RPGEntity): boolean {
    return entity.type == "rpg" && entity.rpgState != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: RPGEntity[]): void {
    entities.forEach((entity, index) => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this

      if (!this.processEntity(entity)) {
        return;
      }
      entity.velocity.x *= 1.15;
      entity.velocity.y *= 1.15;
      //@ts-ignore
      entities.push(tileExplosionEntity.create(entity.position));
      entity.position = (entity.position as Vector).add(entity.velocity as Vector);
      (entity.collider as Box).setPosition(entity.position.x, entity.position.y);

      if (entity.position.y >= 300 || entity.position.y < -50 || entity.position.x < -15 || entity.position.x > 450) {
        //entity left screen, remove
        entities.splice(index, 1);
      }
    });
  }
}
