import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IProductFromServer} from "../types/products";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  constructor(private http: HttpClient) { }

  async getData(jwtHeader: string): Promise<Observable<IProductFromServer[]>> {
    try {
      // @ts-ignore
      return this.http.get('https://tp05-ukhanov-ilya.onrender.com/products',
        { headers: new HttpHeaders().set("Authorization", jwtHeader)  }
      );
    } catch (error) {
      return Promise.reject();
    }
  }

}
