import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agent} from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }
  private baseUrl= 'http://localhost:5000/api/agents';

  getAllAgents(): Observable<Agent[]>{
    return this.http.get<Agent[]>(`${this.baseUrl}`);
  }
}
