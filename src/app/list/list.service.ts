import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ListService{

  private readonly API = 'https://swapi.co/api/people';

  constructor(private http: HttpClient) {}

  listarPersonagem(){
    return this.http.get(this.API);
  }

  customGet(endpoint){
    return this.http.get(endpoint);
  }

}
