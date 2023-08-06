import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { PositionComponent } from "../Components/positionComp";
import { TypeComponent } from "../Components/typeComponent";
import { VelocityComponent } from "../Components/velocityComp";
import { Box, Body, Circle } from "detect-collisions";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type LaserEntity = Entity & TypeComponent & PositionComponent & VelocityComponent;

export class LaserMoveSystem extends System {
  template = ``;
  public constructor() {
    super("lasermove");
  }

  public processEntity(entity: LaserEntity): boolean {
    return entity.type == "laser" && entity.velocity != null && entity.position != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: LaserEntity[]): void {
    entities.forEach(entity => {
      if (!this.processEntity(entity)) {
        return;
      }
      entity.position = entity.position.add(entity.velocity);
      //@ts-ignore
      (entity.collider as Box).setPosition(entity.position.x, entity.position.y);
    });
  }
}
