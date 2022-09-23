import { Expose, plainToInstance, Type } from "class-transformer";
import { Serializable } from "../interfaces/serializable";

export class Intern implements Serializable {


  @Expose()
  public id?: number;
  @Expose()
  public name!: string;
  @Expose()
  public firstname?: string;
  @Expose()
  public phoneNumber?: string;
  @Expose()
  public email?: string;
  @Expose()
  @Type(() => Date)
  public birthDate?: Date;
  @Expose()
  public address?: string;


//deseriazation
  public deserialize(plainIntern: any): Intern {
    const asClass: Intern = plainToInstance(Intern, plainIntern, {excludeExtraneousValues: true});
    return asClass;
  }
}


