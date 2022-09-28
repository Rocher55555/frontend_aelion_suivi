import { Expose, plainToInstance, Type } from "class-transformer";
import 'reflect-metadata';
import { Serializable } from "../interfaces/serializable";

// @Expose() => indique que cet attribut est concerné par la “deserialization”
// @Type() => définit une fonction de “mapping” permettant de convertir la donnée “entrante” vers le type souhaité (ici Date)
//POJO => plain Object


export class POE implements Serializable<POE>  {

  @Expose()
  public id?: number;
  @Expose()
  public name!: string;
  @Expose()
  @Type(() => Date)
  public beginDate?: Date;
  @Expose()
  @Type(() => Date)
  public endDate? : Date;


// deseriazation
  public deserialize(plainPOE: any): POE {
    const asClass: POE = plainToInstance(POE, plainPOE, {excludeExtraneousValues: true});
    return asClass;
    }
}
