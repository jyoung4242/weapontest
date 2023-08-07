import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
//import { TemplateComponent } from "../Components/templateComponent";
import { TypeComponent } from "../Components/typeComponent";
import { collisionComponent } from "../Components/collisionComp";
import { Box, Body, System as dcSystem, PotentialVector, Response, Circle } from "detect-collisions";
import { Camera } from "../../_SqueletoECS/Camera";
import { LaserSmokeEntity } from "../Entities/lasersmoke";
import { tileExplosionEntity } from "../Entities/tiledExplosion";

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

      //get grenades
      const grenades = entities.filter(ent => ent.type == "grenade");
      grenades.forEach(grenade => {
        const isColliding: Boolean = this.cs.checkCollision(entity.collider as Box, grenade.collider as Box);
        if (isColliding) {
          //find laser entity index
          const grenadeIndex = entities.findIndex(ent => {
            return ent.collider == grenade.collider;
          });
          if (grenadeIndex >= 0) {
            console.log("here");

            //remove from entities
            //@ts-ignore
            const smokeVector = entities[grenadeIndex].position;
            console.log(smokeVector, grenadeIndex);

            this.cs.remove(entities[grenadeIndex].collider as Box);
            entities.splice(grenadeIndex, 1);

            //@ts-ignore
            entities.push(tileExplosionEntity.create(smokeVector));
          }
        }
      });
    });
  }
}
