import { Camera } from "../../_SqueletoECS/Camera";
import { Vector } from "../../_SqueletoECS/Vector";
import { droneToken } from "../Entities/droneToken";
import { grenadeToken } from "../Entities/grenadeToken";
import { rpgToken } from "../Entities/rpgToken";
import { launchWeapons } from "../weaponSystems";

export class weaponUI {
  playerEntity: any = undefined;
  weaponEntity: string;
  weaponLevel: number;
  camera: Camera | undefined;
  get getCount() {
    if (this.camera) return this.camera.entities.length;
  }
  public template = `
  <style>
    .selctions{
        position: relative;
        font-size: 6px;
        width: 100%;
        height: 100%;
    }
    .weaponlabel{
        position: absolute;
        top: 5px;
        left: 5px;
    }
    .weapondropdown{
        position: absolute;
        top: 5px;
        left: 55px;
        font-size: 12px;
    }
    .levelLabel{
        position: absolute;
        top: 25px;
        left: 5px;
    }
    .levelinput{
        position: absolute;
        top: 25px;
        left: 55px;
        font-size: 6px;
    }
    .playbutton{
        position: absolute;
        top: 40px;
        left: 5px;
        font-size: 6px;
    }

    .entitycount{position: absolute;
      bottom: 5px;
      left: 5px;
      font-size: 6px;}

    player{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 32px;
        height: 32px;
        background-color: lightgrey;
        border: 1px solid white;
        border-radius: 3px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
  </style>

  <div class='selctions'>
    <label class="weaponlabel" for="weapons">Choose a weapon:</label>
    <select class="weapondropdown" name="weapons" id="weapons" \${change@=>newweapon} \${value<=>weaponEntity}>
        <option value="default">Select one</option>
        <option value="drone">Drone</option>
        <option value="grenades">Grenades</option>
        <option value="RPG">RPG</option>
        <option value="flamethrower">Flamethrower</option>
        <option value="knives">Knives</option>
        <option value="landmines">Landmines</option>
        <option value="claymores">Claymore</option>
        <option value="mortars">Mortars</option>
        <option value="artillery">Artillery</option>
        <option value="machete">Machete</option>
    </select>

    <label class="levelLabel" for="levels">Choose Level: </label>
    <input class="levelinput" type="number" min="1" max="8" \${value<=>weaponLevel} />
    <button class="playbutton" \${click@=>launchweapon}>Play</button>
    <div class="entitycount">Entity Count: \${getCount}</div>
  </div>
  `;

  newweapon = (e: any, model: any, attribute: any) => {
    this.clearEntities();
    this.setNewEntities(this.weaponEntity);
  };

  constructor() {
    this.weaponLevel = 1;
    this.weaponEntity = "RPG";
  }

  static create() {
    return new weaponUI();
  }

  setcamera(cam: Camera) {
    this.camera = cam;
    this.newweapon(null, null, null);
  }

  clearEntities() {
    if (this.camera) this.camera.entities = [this.camera.entities[0], this.camera.entities[1], this.camera.entities[2]];
  }

  setNewEntities(type: string) {
    switch (type) {
      case "drone":
        if (this.camera) this.camera.entities.push(droneToken.create());
        break;
      case "grenades":
        if (this.camera) this.camera.entities.push(grenadeToken.create());
        break;
      case "RPG":
        if (this.camera) this.camera.entities.push(rpgToken.create());
        break;
      case "flamethrower":
        break;
      case "knives":
        break;
    }
  }

  launchweapon() {
    launchWeapons(this.camera as Camera, this.camera?.entities[0], this.weaponEntity, this.weaponLevel.toString());
  }

  update(deltaTime: number) {}
}
