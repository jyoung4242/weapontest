import { Component } from "../../_SqueletoECS/component";
import { Box, Body, Circle } from "detect-collisions";

// you can define the incoming types when the component is created
export interface IcollisionComponent {
  data: collisionType;
}
export type collisionType = Body | Box | Circle | undefined;

// this is the exported interface that is used in systems modules
export interface collisionComponent {
  collider: collisionType;
}

// classes should have:
// if UI element, a template property with the peasy-ui template literal
// if no UI aspect to the system, do not define a template
// a 'value' property that will be attached to the entity
export class collisionComp extends Component {
  //setting default value
  public value: collisionType = undefined;
  public constructor() {
    //@ts-ignore
    super("collider", collisionComp, true);
  }

  public define(data: IcollisionComponent): void {
    if (data == null) {
      return;
    }
    this.value = data.data;
  }
}
