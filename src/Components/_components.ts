// initialize all your system components here
// simply import then and create a new instance in the array
// for example
// import { Name } from "./nameComp";
// export function LoadComponents(){
//  [new Name(),... and all your other components follow]
// }

import { collisionComp } from "./collisionComp";
import { droneStateComp } from "./droneState";
import { grenadeStateComp } from "./grenadeState";
import { LevelComp } from "./level";
import { OrientationComp } from "./orientation";
import { Position } from "./positionComp";
import { rpgStateComp } from "./rpgState";
import { SpritesComp } from "./sprites";
import { TypeComp } from "./typeComponent";
import { Velocity } from "./velocityComp";
import { ZindexComp } from "./zindexComp";

// The template component is demonstrated by default, you'll probably
// want to replace it

export function LoadComponents() {
  [
    new OrientationComp(),
    new Position(),
    new ZindexComp(),
    new SpritesComp(),
    new TypeComp(),
    new Velocity(),
    new droneStateComp(),
    new collisionComp(),
    new grenadeStateComp(),
    new rpgStateComp(),
    new LevelComp(),
  ];
}
