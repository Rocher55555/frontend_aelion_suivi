import { AbstractControl, ValidationErrors } from "@angular/forms";
import * as moment from "moment";
import { Logger } from "../helpers/logger";

/**
 * Date => convertion in Moment Object
 * if dateNotLessThan true => ça ne marche pas | null = ça passe
 * @param control
 * @returns ValidationErrors or Null (both are Object)
 */

export class DateValidator {
  public static dateNotLessThan(control: AbstractControl): ValidationErrors | null {
// si rien sais par le user, je ne continu pas si que des espaces ... le trim va les enlever
// pas de saison pas de modif en objet moment
      if (control!.value && control!.value.toString().trim()=== '') {
          return null;
      }

      const userEnteredDate: moment.Moment = moment(control.value);

      const today: moment.Moment = moment();
      if (userEnteredDate.isSameOrAfter(today)) {
          return {dateNotLessThan: true}
      }
      return null;
  }
}
