import { Box } from "detect-collisions";
import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { TypeComponent } from "../Components/typeComponent";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type KnifeEntity = Entity & TypeComponent;

export class knifeMoveSystem extends System {
  public template = ``;
  public constructor() {
    super("knifeMove");
  }

  public processEntity(entity: KnifeEntity): boolean {
    return entity.type == "knife";
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: KnifeEntity[]): void {
    entities.forEach((entity, index) => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this
      if (!this.processEntity(entity)) {
        return;
      }

      //@ts-ignore
      entity.position = (entity.position as Vector).add(entity.velocity as Vector);
      entity.orientation += 20;
      (entity.collider as Box).setPosition(entity.position.x, entity.position.y);
      (entity.collider as Box).setAngle(entity.orientation);

      if (entity.position.y >= 300 || entity.position.y < -50 || entity.position.x < -15 || entity.position.x > 450) {
        //entity left screen, remove
        entities.splice(index, 1);
      }
    });
  }
}
