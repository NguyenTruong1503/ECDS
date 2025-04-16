import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hospital, HospitalExpand} from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private baseUrl= 'http://localhost:5000/api/hospitals';
  constructor(private http: HttpClient) { }
  getHospitals(regionId: string): Observable<HospitalExpand[]> {
    return this.http.get<HospitalExpand[]>(`${this.baseUrl}/region/${regionId}`);
  }
  getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${this.baseUrl}`);
  }
}
