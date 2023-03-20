import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

@Injectable({
    providedIn: 'root',
  })
  export class crudService { 
        constructor(private http: HttpClient) { }

        UserData(data: any) {
            return this.http.post(environment.apiUrl + '/user', data, httpOptions)
        }

        getData() {
          return this.http.get(environment.apiUrl + '/user')
        }

        deleteUser(id: string) { 
          return this.http.delete(environment.apiUrl + '/user/' + id, httpOptions)
        }

        updateData(id:any,data: any) {
          return this.http.put(environment.apiUrl + '/user/' + id, data, httpOptions)
        }
  }