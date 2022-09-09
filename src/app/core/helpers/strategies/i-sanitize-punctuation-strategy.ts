export interface ISanitizePuntuationStrategy{

  sanitize(index : number, stringArray: string[], output: string): string;

}
