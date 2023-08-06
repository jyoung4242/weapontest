import { Camera } from "../_SqueletoECS/Camera";
import { Vector } from "../_SqueletoECS/Vector";
import { Entity } from "../_SqueletoECS/entity";
import { PositionComponent } from "./Components/positionComp";
import { droneEntity } from "./Entities/drone";
import { playerEntity } from "./Entities/player";

type WeaponEntity = Entity & PositionComponent;

export function launchWeapons(camera: Camera, owner: WeaponEntity, type: string, level: string) {
  switch (type) {
    case "drone":
      launchDrones(camera, owner, level);
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
  console.log("starting offsets: ", startingoffset1, startingoffset2);

  camera.entities.push(droneEntity.create(0, llevel, new Vector(owner.position.x, owner.position.y - 45)));
  if (llevel > 3) camera.entities.push(droneEntity.create(1, llevel, owner.position.add(startingoffset1 as Vector)));
  if (llevel > 6) camera.entities.push(droneEntity.create(2, llevel, owner.position.add(startingoffset2 as Vector)));
}
