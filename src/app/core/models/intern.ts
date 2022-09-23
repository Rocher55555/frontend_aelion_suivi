import { Expose, plainToInstance, Type } from "class-transformer";

export class Intern {
  @Expose()
  public id?: number;
  @Expose()
  public name!: string;
  @Expose()
  public firstname?: string;
  @Expose()
  public phoneNumber?: string;
  @Expose()
  @Type(() => Date)
  public email?: string;
  @Expose()
  @Type(() => Date)
  public birthDate?: Date;
  @Expose()
  public address?: string;



// deseriazation
public deserialize(plainIntern: any): Intern {
  const asClass: Intern = plainToInstance(Intern, plainIntern, {excludeExtraneousValues: true});
  return asClass;
  }


}
