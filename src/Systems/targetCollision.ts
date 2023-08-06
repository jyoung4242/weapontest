import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
//import { TemplateComponent } from "../Components/templateComponent";
import { TypeComponent } from "../Components/typeComponent";
import { collisionComponent } from "../Components/collisionComp";
import { Box, Body, System as dcSystem, PotentialVector, Response, Circle } from "detect-collisions";
import { Camera } from "../../_SqueletoECS/Camera";
import { LaserSmokeEntity } from "../Entities/lasersmoke";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type TargetEntity = Entity & TypeComponent & collisionComponent;

export class targetCollisionSystem extends System {
  public template = ``;
  cs: dcSystem;
  cam: Camera;
  public constructor(collisionSystem: dcSystem, cam: Camera) {
    super("targetcollision");
    this.cs = collisionSystem;
    this.cam = cam;
  }

  public processEntity(entity: TargetEntity): boolean {
    return entity.type == "target" && entity.collider != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: TargetEntity[]): void {
    entities.forEach(entity => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this
      if (!this.processEntity(entity)) {
        return;
      }

      //get lasers
      const lasers = entities.filter(ent => ent.type == "laser");
      if (lasers.length == 0) return;

      lasers.forEach(laser => {
        const isColliding: Boolean = this.cs.checkCollision(entity.collider as Box, laser.collider as Box);
        if (isColliding) {
          //find laser entity index
          const laserIndex = entities.findIndex(ent => {
            return ent.collider == laser.collider;
          });
          if (laserIndex >= 0) {
            //remove from entities
            //@ts-ignore
            const smokeVector = entities[laserIndex].position;
            this.cs.remove(entities[laserIndex].collider as Box);
            entities.splice(laserIndex, 1);

            //@ts-ignore
            entities.push(LaserSmokeEntity.create(smokeVector));
            //this.camera.entities.push()
          }
        }
      });
    });
  }
}
