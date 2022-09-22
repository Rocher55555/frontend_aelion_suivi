import { AbstractControl } from "@angular/forms";
import * as moment from "moment";


/**
 * Date => convertion in Moment Object
 * if dateNotLessThan true => ça ne marche pas | null = ça passe
 * @param control
 * @returns ValidationErrors or Null (both are Object)
 */
export class DateValidator {


//(control.errors !== null)  => si erreur ne retourne pas la Date
  public static dateNotLessThan(control: AbstractControl): { [key: string]: any } | null {
    if (control.errors !== null) {
      return null;
    }
    const userEnteredDate: moment.Moment = moment(control.value);
    const today: moment.Moment = moment();
    return userEnteredDate.isSameOrAfter(today) ? { dateNotLessThan: true} : null;
  }

}
