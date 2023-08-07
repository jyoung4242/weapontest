import { Component } from "../../_SqueletoECS/component";

// you can define the incoming types when the component is created
export interface ILevelComponent {
  data: LevelType;
}
export type LevelType = number;

// this is the exported interface that is used in systems modules
export interface LevelComponent {
  level: LevelType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class LevelComp extends Component {
  // UI template string literal with UI binding of value property

  //setting default value
  public value: LevelType = 1;
  public constructor() {
    //@ts-ignore
    super("level", LevelComp, true);
  }

  public define(data: ILevelComponent): void {
    if (data == null) {
      return;
    }
    this.value = data.data;
  }
}
