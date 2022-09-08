import { validateHorizontalPosition } from "@angular/cdk/overlay";

export abstract class StringHelper {

  //remove leading and trailling white space
  public static removeSpaces(input: string): string {
    return input.trim();
}


/**
 * Sanitize string ponctuation according language
 * @param input String to sanitize
 * @param locale Language to use to sanitize
 *
 * @returns string input with correct ponctuation
 *
 * @usage
 *  input => La méthode s'utilise de la manière suivante: sanitize
 *  locale => fr
 *  Must return : La méthode s'utilise de la manière suivante : sanitize
 *  locale => us
 *  Must return : La méthode s'utilise de la manière suivante: sanitize
 *
 * French language
 *  => : | ; One space before, One space after
 *  => ,|. One space after
 * English languages
 *  => : | ; One space after only
 *  => ,|. One space after
 */


public static sanitizePonctuation(input: string, locale?: string): string {
    return '';
}

/*

*/






/*-----------------------------------------------------------*/


/**
 * Sanitize compound firstname (i.e Jean Luc => Jean-Luc)
 * @param firstname
 * @returns string firstname correctly spelled
 *//*



// trying to show to JL => fail
/*
public static sanitizeFirstName(firstname: string): string {
  this.removeSpaces(firstname)
  const regex: RegExp = /[ ]/g
  const matches : string [] | null = firstname.match(regex)
  if (matches !== null) {
    firstname.replace(regex, '-')
  }
  return firstname
}
*/
/*
si je trouve un espace au sein de la même string entre 2 lettres
alors je trouve la position de l'espace
je supprime les espaces remplace par un tiret
=> donne des mots de ref qui doit sup et le remplacer par un tiret
*/

//avec tif

public static sanitizeFirstName(firstname: string): string {
  const regex: RegExp = /[-_ ]+/g
  const cleanFirstname : string = this.removeSpaces(firstname).replace(regex, '-')
  return cleanFirstname;
}




/*-----------------------------------------------------------*/

/**
 * Remove unexpected chars before and after a string
 *  i.e !_ Pierre Blin *- => Pierre Blin
 * @param value String to sanitize
 * @param regexp RegExp containing unexpected chars before and after string
 * @returns
 */
/*
public static removeUnexpectedChars(value: string, regexp: RegExp): string {
  value = this.removeSpaces(value);  // nettoie mes strings : elimine les espaces av et ap
  regexp = /[!:-_^;,&]/g;  // mes motifs recherchés dans la valeur
  const pureValue = value.match(regexp)
  if (pureValue !== null) {
    return pureValue;
  }
  return value;
}
*/


/**

La valeur est un string : peut être un prénom ou un nom
je nettoie mes strings ET

SI je trouve des motifs avant ou apres ma "value"
ALORS j'efface ces motifs
FIN SI
je RETOURNE la valeur
*/


}
