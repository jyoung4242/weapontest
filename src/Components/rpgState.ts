import { Component } from "../../_SqueletoECS/component";
import Chance from "chance";

const chance = Chance();

// you can define the incoming types when the component is created
export interface IrpgStateComponent {
  level: number;
  index: number;
}
export type rpgStateType = {
  level: number;
  index: number;
  cooldown: number;
  damage: number;
  blastradius: number;
};

// this is the exported interface that is used in systems modules
export interface rpgStateComponent {
  rpgState: rpgStateType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class rpgStateComp extends Component {
  //setting default value
  public value: rpgStateType = {
    level: 1,
    cooldown: 5,
    damage: 1,
    index: 0,
    blastradius: 16,
  };
  public constructor() {
    //@ts-ignore
    super("rpgState", rpgStateComp, true);
  }

  public define(data: IrpgStateComponent): void {
    if (data == null) {
      return;
    }

    switch (data.level) {
      case 1:
        this.value = {
          level: 1,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 2:
        this.value = {
          level: 2,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 3:
        this.value = {
          level: 3,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 4:
        this.value = {
          level: 4,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 5:
        this.value = {
          level: 5,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 6:
        this.value = {
          level: 6,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 7:
        this.value = {
          level: 7,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
      case 8:
        this.value = {
          level: 8,
          cooldown: 5,
          damage: 1,
          index: 0,
          blastradius: 16,
        };
        break;
    }
  }
}
