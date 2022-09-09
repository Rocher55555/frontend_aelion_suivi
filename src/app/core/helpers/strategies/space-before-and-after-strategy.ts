import { ISanitizePuntuationStrategy } from "./i-sanitize-punctuation-strategy";

export class SpaceBeforeAndAfterStrategy implements ISanitizePuntuationStrategy {

  sanitize(index : number, stringArray: string[], output: string): string {

    const previousChar: string = stringArray[index - 1];
    const nextChar : string = stringArray[index + 1];

    if( previousChar !== ' '){
      output = output.substring(0, output.length) + ' ' + stringArray[index];
    } else {
      output = output + stringArray[index]
    }

    if( nextChar !== ' ') {
      output = output.substring(0, output.length + 1) + ' ' ;
    }

    return output;
  }


}
