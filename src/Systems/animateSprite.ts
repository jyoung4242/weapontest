import { Entity } from "../../_SqueletoECS/entity";
import { System } from "../../_SqueletoECS/system";
import { SpritesComponent } from "../Components/sprites";
import { TypeComponent } from "../Components/typeComponent";

// type definition for ensuring the entity template has the correct components
// ComponentTypes are defined IN the components imported
export type SpriteEntity = Entity & SpritesComponent & TypeComponent;

export class animateSpriteSystem extends System {
  template = ``;
  public constructor() {
    super("animate");
  }

  public processEntity(entity: SpriteEntity): boolean {
    // return the test to determine if the entity has the correct properties
    return entity.sprites != null && entity.type != null;
  }

  // update routine that is called by the gameloop engine
  public update(deltaTime: number, now: number, entities: SpriteEntity[]): void {
    entities.forEach((entity: any, index: number) => {
      if (!this.processEntity(entity)) {
        return;
      }

      entity.sprites.forEach((sprite: any) => {
        if (sprite.animationSequence) {
          switch (entity.type) {
            case "token":
              //this layer is animated
              if (
                sprite.frameTik != undefined &&
                sprite.frameIndex != undefined &&
                sprite.frameRate != undefined &&
                sprite.position != undefined
              ) {
                sprite.frameTik++;

                if (sprite.frameTik == sprite.frameRate) {
                  sprite.frameIndex++;
                  sprite.frameTik = 0;
                  //console.log("in animation update", sprite);

                  //check if at end of currentsequence array
                  if (sprite.frameIndex >= sprite.animationSequence.sequences[sprite.currentSequence as string].length) {
                    sprite.frameIndex = 0;
                  }

                  //update position of sprite based on sequence
                  sprite.position.x = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][0];
                  sprite.position.y = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][1];
                  //console.log("position", sprite.position);
                }
              }
              break;
            case "lasersmoke":
            case "tileexplosion":
            case "flamethrower":
              if (
                sprite.frameTik != undefined &&
                sprite.frameIndex != undefined &&
                sprite.frameRate != undefined &&
                sprite.position != undefined
              ) {
                sprite.frameTik++;

                if (sprite.frameTik == sprite.frameRate) {
                  sprite.frameIndex++;
                  sprite.frameTik = 0;
                  //console.log("in animation update", sprite);

                  //check if at end of currentsequence array
                  if (sprite.frameIndex >= sprite.animationSequence.sequences[sprite.currentSequence as string].length) {
                    // for lasersmoke, you remove the entity at this point, not reset
                    entities.splice(index, 1);
                    return;
                  }

                  //update position of sprite based on sequence
                  sprite.position.x = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][0];
                  sprite.position.y = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][1];
                  //console.log("position", sprite.position);
                }
              }
              break;

            default:
              //this layer is animated

              if (
                sprite.frameTik != undefined &&
                sprite.frameIndex != undefined &&
                sprite.frameRate != undefined &&
                sprite.position != undefined
              ) {
                sprite.frameTik++;

                if (sprite.frameTik == sprite.frameRate) {
                  sprite.frameIndex++;
                  sprite.frameTik = 0;
                  //console.log("in animation update", sprite);

                  //check if at end of currentsequence array
                  if (sprite.frameIndex >= sprite.animationSequence.sequences[sprite.currentSequence as string].length) {
                    sprite.frameIndex = 0;
                  }

                  //update position of sprite based on sequence
                  sprite.position.x = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][0];
                  sprite.position.y = sprite.animationSequence.sequences[sprite.currentSequence as string][sprite.frameIndex][1];
                  //console.log("position", sprite.position);
                }
              }
              break;
          }
        }
      });
    });
  }
}
