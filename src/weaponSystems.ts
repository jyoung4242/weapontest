import { Camera } from "../_SqueletoECS/Camera";
import { Vector } from "../_SqueletoECS/Vector";
import { Entity } from "../_SqueletoECS/entity";
import { PositionComponent } from "./Components/positionComp";
import { droneEntity } from "./Entities/drone";
import { fThrowerEntity } from "./Entities/flamethrower";
import { grenadeEntity } from "./Entities/grenade";
import { rpgEntity } from "./Entities/rpg";
import { Chance } from "chance";
import { tknifeEntity } from "./Entities/tknife";
import { uavEntity } from "./Entities/uav";

const chance = Chance();
type WeaponEntity = Entity & PositionComponent;

export function launchWeapons(camera: Camera, owner: WeaponEntity, type: string, level: string) {
  console.log(type);

  switch (type) {
    case "drone":
      launchDrones(camera, owner, level);
      break;
    case "grenades":
      launchGrenades(camera, owner, level);
      break;
    case "RPG":
      launchRPGs(camera, owner, level);
      break;
    case "flamethrower":
      console.log("here");

      launchFlameThrower(camera, owner, level);
      break;
    case "knives":
      launchKnife(camera, owner, level);
      break;
    case "artillery":
      launchUAV(camera, owner, level);
      break;
  }
}

function launchDrones(camera: Camera, owner: WeaponEntity, level: string): void {
  let llevel = parseInt(level);
  let startingoffset1, startingoffset2;
  if (llevel > 3 && llevel < 7) startingoffset1 = new Vector(16, 45);
  if (llevel > 6) {
    startingoffset1 = new Vector(61 * -Math.cos(2.0944), 45 * Math.sin(2.0944));
    startingoffset2 = new Vector(61 * Math.cos(2.0944), 45 * Math.sin(2.0944));
  }

  camera.entities.push(droneEntity.create(0, llevel, new Vector(owner.position.x, owner.position.y - 45)));
  if (llevel > 3) camera.entities.push(droneEntity.create(1, llevel, owner.position.add(startingoffset1 as Vector)));
  if (llevel > 6) camera.entities.push(droneEntity.create(2, llevel, owner.position.add(startingoffset2 as Vector)));
}

function launchGrenades(camera: Camera, owner: WeaponEntity, level: string): void {
  let llevel = parseInt(level);
  camera.entities.push(grenadeEntity.create(0, llevel, new Vector(owner.position.x, owner.position.y)));
  if (llevel > 3) camera.entities.push(grenadeEntity.create(1, llevel, new Vector(owner.position.x, owner.position.y)));
  if (llevel > 6) camera.entities.push(grenadeEntity.create(2, llevel, new Vector(owner.position.x, owner.position.y)));
}

function launchRPGs(camera: Camera, owner: WeaponEntity, level: string): void {
  let llevel = parseInt(level);
  camera.entities.push(rpgEntity.create(0, llevel, new Vector(owner.position.x, owner.position.y)));
  if (llevel > 3) camera.entities.push(rpgEntity.create(1, llevel, new Vector(owner.position.x, owner.position.y)));
  if (llevel > 6) camera.entities.push(rpgEntity.create(2, llevel, new Vector(owner.position.x, owner.position.y)));
}

function launchFlameThrower(camera: Camera, owner: WeaponEntity, level: string) {
  let llevel = parseInt(level);
  let fanAngle: number;
  let duration;
  if (llevel < 4) {
    fanAngle = 5;
    duration = 4;
  } else if (llevel > 3 && llevel < 7) {
    fanAngle = 10;
    duration = 6;
  } else {
    fanAngle = 20;
    duration = 8;
  }
  let direction: "up" | "down" | "left" | "right" = chance.pickone(["left", "right", "up", "down"]);
  let fentIndex = 0;
  console.log("here");
  const FTtimer = setInterval(() => {
    camera.entities.push(
      fThrowerEntity.create(fentIndex, llevel, new Vector(owner.position.x, owner.position.y), fanAngle, direction)
    );
    console.log(camera.entities);
  }, 75);
  setTimeout(() => {
    clearInterval(FTtimer);
  }, duration * 1000);
}

function launchKnife(camera: Camera, owner: WeaponEntity, level: string) {
  let llevel = parseInt(level);
  let direction: "up" | "down" | "left" | "right" = chance.pickone(["left", "right", "up", "down"]);
  let knifeoffset1, knifeoffset2;
  switch (direction) {
    case "up":
    case "down":
      knifeoffset1 = new Vector(owner.position.x - 8, owner.position.y);
      knifeoffset2 = new Vector(owner.position.x + 8, owner.position.y);
      break;
    case "left":
    case "right":
      knifeoffset1 = new Vector(owner.position.x, owner.position.y + 8);
      knifeoffset2 = new Vector(owner.position.x, owner.position.y - 8);
      break;
  }
  camera.entities.push(tknifeEntity.create(0, llevel, owner.position, direction));
  if (llevel > 3) camera.entities.push(tknifeEntity.create(1, llevel, knifeoffset1, direction));
  if (llevel > 6) camera.entities.push(tknifeEntity.create(2, llevel, knifeoffset2, direction));
}

function launchUAV(camera: Camera, owner: WeaponEntity, level: string) {
  let llevel = parseInt(level);
  camera.entities.push(uavEntity.create(0, llevel));
}
