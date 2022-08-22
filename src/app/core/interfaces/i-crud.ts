export interface ICrud<T> {
  add(item: T): void
  update(item: T): void;
  delete(item : T): void;
  findAll():void;
  findOne(id: number): T | null;
}
