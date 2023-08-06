import { Component } from "../../_SqueletoECS/component";
import Chance from "chance";

export enum droneStates {
  "inactive" = "inactive",
  "init" = "init",
  "moving" = "moving",
  "leaving" = "leaving",
}

const chance = Chance();

// you can define the incoming types when the component is created
export interface IdroneStateComponent {
  level: number;
  index: number;
}
export type droneStateType = {
  level: number;
  index: number;
  state: droneStates;
  cooldown: number;
  damage: number;
  range: number;
  theta: number;
  fireDelay: number;
};

// this is the exported interface that is used in systems modules
export interface droneStateComponent {
  droneState: droneStateType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class droneStateComp extends Component {
  //setting default value
  public value: droneStateType = {
    state: droneStates.inactive,
    level: 1,
    cooldown: 5,
    damage: 1,
    range: 10,
    index: 0,
    theta: 0,
    fireDelay: 0,
  };
  public constructor() {
    //@ts-ignore
    super("droneState", droneStateComp, true);
  }

  public define(data: IdroneStateComponent): void {
    if (data == null) {
      return;
    }

    switch (data.level) {
      case 1:
        this.value = {
          state: droneStates.inactive,
          level: 1,
          cooldown: 6,
          damage: 1,
          range: chance.integer({ min: 55, max: 55 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 2:
        this.value = {
          state: droneStates.inactive,
          level: 2,
          cooldown: 5,
          damage: 2,
          range: chance.integer({ min: 7, max: 11 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 3:
        this.value = {
          state: droneStates.inactive,
          level: 3,
          cooldown: 5,
          damage: 3,
          range: chance.integer({ min: 8, max: 13 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 4:
        this.value = {
          state: droneStates.inactive,
          level: 4,
          cooldown: 4.5,
          damage: 3,
          range: chance.integer({ min: 8, max: 13 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 5:
        this.value = {
          state: droneStates.inactive,
          level: 5,
          cooldown: 4,
          damage: 4,
          range: chance.integer({ min: 9, max: 14 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 6:
        this.value = {
          state: droneStates.inactive,
          level: 6,
          cooldown: 3.5,
          damage: 5,
          range: chance.integer({ min: 10, max: 14 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 7:
        this.value = {
          state: droneStates.inactive,
          level: 7,
          cooldown: 3,
          damage: 6,
          range: chance.integer({ min: 11, max: 15 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
      case 8:
        this.value = {
          state: droneStates.inactive,
          level: 8,
          cooldown: 2,
          damage: 8,
          range: chance.integer({ min: 50, max: 70 }),
          index: data.index,
          theta: 0,
          fireDelay: 0,
        };
        break;
    }
  }
}
