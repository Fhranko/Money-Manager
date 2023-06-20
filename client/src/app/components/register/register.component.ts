import { Component, OnInit } from '@angular/core';

import { Moment } from 'moment';
import * as moment from 'moment';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import 'moment/locale/es';

import { types as typesDB } from '../../../assets/fakeDatabase';
import { TransactionsService } from './../../services/transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypesService } from './../../services/types.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class RegisterComponent implements OnInit {
  constructor(
    private transactionsService: TransactionsService,
    private typesService: TypesService,
    private _snackBar: MatSnackBar
  ) {}
  types: string[] = typesDB;
  amount: number = 0;
  selectedType: string = '';
  transactionDate: Moment = moment();

  transactions: object[] = [];

  displayedColumns: string[] = ['date', 'type', 'amount'];

  ngOnInit(): void {
    this.typesService.getTypes().subscribe({
      next: (response) => {
        this.types = response.data.map((type) => type.name);
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Cerrar', {
          duration: 2000,
        });
      },
    });

    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (response) => {
        response.data = response.data.map((transaction) => {
          transaction.date = moment(transaction.date).format('DD/MM/YYYY');
          return transaction;
        });

        this.transactions = response.data;
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }

  saveTransaction(): void {
    const data = {
      amount: this.amount,
      type: this.selectedType,
      date: this.transactionDate,
    };

    this.transactionsService.saveTransaction(data).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', {
          duration: 2000,
        });

        this.getTransactions();

        this.amount = 0;
        this.selectedType = '';
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }
}
