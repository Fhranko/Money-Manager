import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/interfaces';

interface Service {
  _id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get<Response<Service>>(
      'http://localhost:8080/api/categories'
    );
  }
}
