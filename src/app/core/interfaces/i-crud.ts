import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ICrud<T> {
  add(item: T): Observable<T>;
  update(item: T): void;
  delete(item : T): Observable<HttpResponse<any>>;
  findAll(): Observable<T[]>;
  findOne(id: number): Observable<T>;
}
