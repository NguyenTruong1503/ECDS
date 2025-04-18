import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegion, RegionExpand} from '../models/region.model';


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private baseUrl= 'http://localhost:5000/api/regions';

  constructor(private http: HttpClient) { }

  getRegions(): Observable<RegionExpand[]> {
    return this.http.get<RegionExpand[]>(this.baseUrl);
  }
  getRegionById(id: string): Observable<IRegion> {
    return this.http.get<IRegion>(`${this.baseUrl}/${id}`);
  }
}
