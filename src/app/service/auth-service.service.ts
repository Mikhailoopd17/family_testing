import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient) { }

  public getCurrentUser() {
    return this.httpClient.get('/api/auth/current');
  }

  public login(login: string, password: string): Observable<object>{
    return this.httpClient.post('/api/auth/login', {login, password});
  }

}
