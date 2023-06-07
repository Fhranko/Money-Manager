import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  saveTransaction(data: object) {
    return this.http.post<Response>(
      'http://localhost:8080/api/transaction',
      data
    );
  }
}
