import { ISanitizePuntuationStrategy } from "./i-sanitize-punctuation-strategy";

export class SpaceAfterOnlyStrategy implements ISanitizePuntuationStrategy {

  sanitize(index: number, stringAsArray: string[], output: string): string {

    const previousChar: string = stringAsArray[index - 1];
    const nextChar : string = stringAsArray[index + 1];


    if (previousChar === ' ') {
      output = output.substring(0, output.length -1) + stringAsArray[index];  // 0 pour concervé le C maj, debut de la chaine parcourue
    } else {
      output = output + stringAsArray[index];
    }

    if( nextChar !== ' ') {
      output = output.substring(0, output.length + 1) + ' ' ;
    }

    return output;
  }
}
