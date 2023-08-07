import { Box } from "detect-collisions";
import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { grenadeStateComponent } from "../Components/grenadeState";
import { TypeComponent } from "../Components/typeComponent";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type GrenadeEntity = Entity & TypeComponent & grenadeStateComponent;

export class grenadeMoveSystem extends System {
  public template = ``;
  public constructor() {
    super("grenadeMove");
  }

  public processEntity(entity: GrenadeEntity): boolean {
    return entity.type == "grenade" && entity.grenadeState != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: GrenadeEntity[]): void {
    entities.forEach((entity, index) => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this
      if (!this.processEntity(entity)) {
        return;
      }

      //@ts-ignore
      entity.velocity.y += 1;
      //@ts-ignore
      entity.position = (entity.position as Vector).add(entity.velocity as Vector);
      entity.orientation += 20;

      (entity.collider as Box).setPosition(entity.position.x, entity.position.y);

      if (entity.position.y >= 300) {
        //entity left screen, remove
        entities.splice(index, 1);
      }
    });
  }
}
