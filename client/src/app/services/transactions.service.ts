import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/interfaces';

interface Transaction {
  _id: string;
  amount: number;
  type: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  saveTransaction(data: object) {
    return this.http.post<Response<Transaction>>(
      'http://localhost:8080/api/transaction',
      data
    );
  }

  getTransactions() {
    return this.http.get<Response<Transaction>>(
      'http://localhost:8080/api/transactions'
    );
  }
}
