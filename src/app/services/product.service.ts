import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products';
  constructor(private http: HttpClient) { }
  getProductsByHospitalId(hospitalId: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/hospital/${hospitalId}`);
  }
}
