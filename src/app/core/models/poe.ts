import { Expose, plainToInstance, Type } from "class-transformer";
import 'reflect-metadata';

// @Expose() => indique que cet attribut est concerné par la “deserialization”
// @Type() => définit une fonction de “mapping” permettant de convertir la donnée “entrante” vers le type souhaité (ici Date)


export class POE {

  @Expose()
  public id?: number;
  @Expose()
  public title!: string;
  @Expose()
  @Type(() => Date)
  public beginningDate?: Date;
  @Expose()
  @Type(() => Date)
  public endDate? : Date;

// ! deseriazation
  public deserialize(plainPOE: any): POE {
    const asClass: POE = plainToInstance(POE, plainPOE, {excludeExtraneousValues: true});
    return asClass;
    }

}
