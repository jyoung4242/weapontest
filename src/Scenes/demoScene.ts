// Library
import { Scene } from "../../_SqueletoECS/Scene";
import { Vector } from "../../_SqueletoECS/Vector";
import { Engine } from "@peasy-lib/peasy-engine";
import { weaponUI } from "../Systems/UI";
import { Box, Body, System as dcSystem, PotentialVector, Response, Circle } from "detect-collisions";

// Scene Systems
/* *README*
  You will import all your  ECS Systems here for this scene here
  for example
  import { MovementSystem } from "../Systems/Movement";
  The camera is required, so we already included it for you
  ... you're welcome ;)
*/
import { Camera, ICameraConfig } from "../../_SqueletoECS/Camera"; //this is in Squeleto library
import { TemplateComp } from "../Components/templateComponent";

// Entities
import { TemplateEntity } from "../Entities/entityTemplate";
import { animateSpriteSystem } from "../Systems/animateSprite";
import { playerEntity } from "../Entities/player";
import { droneMovement } from "../Systems/droneMovement";
import { TargetEntity } from "../Entities/target";
import { droneAttackSystem } from "../Systems/droneAttack";
import { LaserMoveSystem } from "../Systems/lasermovement";
import { targetCollisionSystem } from "../Systems/targetCollision";
import { grenadeMoveSystem } from "../Systems/grenadeMovement";
import { rpgMoveSystem } from "../Systems/rpgMovement";
import { ftMoveSystem } from "../Systems/ftMovment";
import { knifeMoveSystem } from "../Systems/knifeMovement";
import { uavMoveSystem } from "../Systems/uavMovement";
/* *README*
  You will import all your  ECS entities for this scene here
  for example
  import { MapEntity } from "../Entities/mapEntity";
  import { DemoEntity } from "../Entities/demo";
*/
export class Test extends Scene {
  name: string = "test";
  entities: any = [];
  entitySystems: any = [];
  sceneSystems: any = [];
  public template = `
    <scene-layer>
        < \${ sceneSystem === } \${ sceneSystem <=* sceneSystems }
    </scene-layer>
  `;
  public init = (): void => {
    //setup collision system
    const collisionSystem = new dcSystem();
    const t1 = TargetEntity.create(new Vector(100, 133));
    const t2 = TargetEntity.create(new Vector(300, 133));
    // add targets into collision system
    console.log(t1, t2);
    // add default entities to the array
    this.entities.push(playerEntity.create(), t1, t2);

    //@ts-ignore
    collisionSystem.insert(t1.collider);
    //@ts-ignore
    collisionSystem.insert(t2.collider);

    //establish Scene Systems - Configuring Camera
    let cConfig: ICameraConfig = {
      name: "camera",
      viewPortSystems: [weaponUI.create()],
      gameEntities: this.entities,
      position: new Vector(0, 0),
      size: new Vector(400, 266.67),
    };
    let camera = Camera.create(cConfig);
    console.log(camera);
    camera.vpSystems[0].setcamera(camera);
    //give the camera its systems to own
    camera.vpSystems.push(new droneMovement());
    camera.vpSystems.push(new animateSpriteSystem());
    camera.vpSystems.push(new LaserMoveSystem());
    camera.vpSystems.push(new droneAttackSystem(camera, collisionSystem));
    camera.vpSystems.push(new targetCollisionSystem(collisionSystem, camera));
    camera.vpSystems.push(new grenadeMoveSystem());
    camera.vpSystems.push(new rpgMoveSystem());
    camera.vpSystems.push(new ftMoveSystem());
    camera.vpSystems.push(new knifeMoveSystem());
    camera.vpSystems.push(new uavMoveSystem());

    //Systems being added for Scene to own
    this.sceneSystems.push(camera);

    //Start GameLoop
    Engine.create({ fps: 60, started: true, callback: this.update });
  };

  //GameLoop update method
  update = (deltaTime: number): void | Promise<void> => {
    this.sceneSystems.forEach((system: any) => {
      system.update(deltaTime / 1000, 0, this.entities);
    });
  };
}
