import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { droneStateComponent, droneStates } from "../Components/droneState";
import { PositionComponent } from "../Components/positionComp";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type droneMoveEntity = Entity & PositionComponent & droneStateComponent;

export class droneMovement extends System {
  public template = ``;
  public constructor() {
    super("dronemove");
  }

  public processEntity(entity: droneMoveEntity): boolean {
    // return the test to determine if the entity has the correct properties
    return entity.position != null && entity.droneState != null;
    // entities that have position and velocity properties can use this system
    return true;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: droneMoveEntity[]): void {
    entities.forEach((entity, index) => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this

      if (!this.processEntity(entity)) {
        return;
      }

      if (entity.droneState.state == droneStates.init || entity.droneState.state == droneStates.inactive) {
        entity.droneState.state = droneStates.moving;
        if (entity.droneState.level > 3 && entity.droneState.level < 7) {
          if (entity.droneState.index == 1) entity.droneState.theta += 180;
        } else if (entity.droneState.level > 6) {
          if (entity.droneState.index == 1) entity.droneState.theta += 120;
          else if (entity.droneState.index == 2) entity.droneState.theta += 240;
        }
      } else if (entity.droneState.state == droneStates.moving) {
        entity.droneState.theta++;
        //  console.log(entity.droneState.index, entity.droneState.theta);

        if (entity.droneState.theta >= 360 && entity.droneState.index == 0) {
          entity.droneState.state = droneStates.leaving;
        } else if (
          entity.droneState.index == 1 &&
          entity.droneState.level > 3 &&
          entity.droneState.level < 7 &&
          entity.droneState.theta >= 540
        ) {
          entity.droneState.state = droneStates.leaving;
        } else if (entity.droneState.index == 1 && entity.droneState.level > 6 && entity.droneState.theta >= 480) {
          entity.droneState.state = droneStates.leaving;
        } else if (entity.droneState.index == 2 && entity.droneState.level > 6 && entity.droneState.theta >= 600) {
          entity.droneState.state = droneStates.leaving;
        }

        let moveVecter = new Vector(Math.cos(this.ang2rad(entity.droneState.theta)), Math.sin(this.ang2rad(entity.droneState.theta)));

        entity.position = entity.position.add(moveVecter);
      } else if (entity.droneState.state == droneStates.leaving) {
        //remove entity
        entities.splice(index, 1);
        return;
      }

      // insert code here on how you want to manipulate the entity properties
    });
  }

  ang2rad(ang: number): number {
    return ang * (Math.PI / 180);
  }
}
