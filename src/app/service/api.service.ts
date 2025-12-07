import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private https: HttpClient) { }
    
    baseUrl:string = 'http://localhost:8000/api/';
    tasksEndPoint = 'tasks/'

    get(endpoint: string) {
      return this.https.get(this.baseUrl + endpoint);
    }

    post(endpoint: string, body: any) {
      return this.https.post(this.baseUrl + endpoint, body);
    }

    patch(endpoint: string, body: any) {
      return this.https.patch(this.baseUrl + endpoint, body);
    }

}
