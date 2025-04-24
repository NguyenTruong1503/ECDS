import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://ecds-be.onrender.com/api/products';
  constructor(private http: HttpClient) { }
  getProductsByHospitalId(hospitalId: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/hospital/${hospitalId}`);
  }

  getListAllCompany() : Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/companies`);
  }

  getFilteredProducts(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search`, { params });
  }

}
