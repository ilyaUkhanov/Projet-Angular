import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IProductFromServer} from "../types/products";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  constructor(private http: HttpClient) { }

  async getData(jwtHeader: string): Promise<Observable<IProductFromServer[]>> {
    try {
      return this.http.get<IProductFromServer[]>(environment.APIUrl + '/products',
        { headers: new HttpHeaders().set("Authorization", jwtHeader)  }
      );
    } catch (error) {
      return Promise.reject();
    }
  }
}
