import { Vector } from "../../_SqueletoECS/Vector";
import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { droneStateComponent } from "../Components/droneState";
import { droneEntity } from "../Entities/drone";
import { TargetEntity } from "../Entities/target";
import { Camera } from "../../_SqueletoECS/Camera";
import { droneLaserEntity } from "../Entities/dronelaser";
import { Engine } from "@peasy-lib/peasy-engine";
import { Box, Body, System as dcSystem, PotentialVector, Response, Circle } from "detect-collisions";
import { LaserEntity } from "./lasermovement";
// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type droneAttackEntity = Entity & droneStateComponent;

export class droneAttackSystem extends System {
  public template = ``;
  cs;
  camera: Camera | undefined;
  public constructor(cam: Camera, collisionSystem: dcSystem) {
    super("droneAttack");
    this.cs = collisionSystem;
    this.camera = cam;
  }

  public processEntity(entity: droneAttackEntity): boolean {
    // return the test to determine if the entity has the correct properties
    return entity.droneState != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: droneAttackEntity[]): void {
    entities.forEach(entity => {
      // This is the screening for skipping entities that aren't impacted by this system
      // if you want to impact ALL entities, you can remove this
      if (!this.processEntity(entity)) {
        return;
      }

      //this is the firing cooldown between shots
      if (entity.droneState.fireDelay < 10) {
        entity.droneState.fireDelay++;
        return;
      }
      entity.droneState.fireDelay = 0;

      //detect enemy in range
      let myEnemies = entities.filter(ent => {
        //@ts-ignore
        return (ent as TargetEntity).type == "target";
      });

      //setup array to track enemies and distances
      const enemyTrackingArray: Array<{ index: number; distance: number }> = [];
      const enemyDistances: Array<number> = [];
      //Distance check for enemies
      let inRangeEnemies = myEnemies.filter((enem: any, index: number) => {
        const distance = this.getDistance(entity, enem);
        //console.log("enemydistance: ", distance, index);

        if (distance < entity.droneState.range) {
          enemyTrackingArray.push({ index, distance });
          enemyDistances.push(distance);
          return true;
        } else {
          return false;
        }
      });

      //no one in range?
      if (inRangeEnemies.length == 0) return;

      //enemey with shortest distance
      const minValue = Math.min(...enemyDistances);
      const indexOfMin = enemyDistances.indexOf(minValue);
      const indexOfClosestEnemey = enemyTrackingArray[indexOfMin].index;
      const closestEnemy = myEnemies[indexOfClosestEnemey];

      //get aiming details from enemy
      //@ts-ignore
      const laserPosition = new Vector(entity.position.x + 15, entity.position.y + 15);
      //@ts-ignore
      //console.log("entity: ", laserPosition, "   enemy: ", closestEnemy.position);

      //console.log(laserPosition, closestEnemy.position);

      //@ts-ignore
      const laserDirectionVector: Vector = entity.position.subtract(closestEnemy.position);
      const laserDirectionNormalized = laserDirectionVector.normalize();
      const laserVelocityVector = new Vector(-laserDirectionNormalized.x * 20, -laserDirectionNormalized.y * 20);

      //Fire Laser at closest enemey
      //@ts-ignore
      const newLaserEntity: LaserEntity = droneLaserEntity.create(
        //@ts-ignore
        entity.position,
        laserVelocityVector,
        laserDirectionNormalized.angle(true)
      );
      //console.log(newLaserEntity);

      this.camera?.entities.push(newLaserEntity);
      //@ts-ignore
      this.cs.insert(newLaserEntity.collider);
      //console.log(this.camera?.entities[this.camera.entities.length - 1].position);
    });
  }

  getDistance(a: droneEntity, b: TargetEntity): number {
    //@ts-ignore
    let aVector = a.position;
    //@ts-ignore
    let bVector = b.position;
    const sepVector: Vector = aVector.subtract(bVector);
    return sepVector.magnitude;
  }
}
