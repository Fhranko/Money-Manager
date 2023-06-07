import { Component } from '@angular/core';
import { types as typesDB } from '../../../assets/fakeDatabase';
import { TransactionsService } from './../../services/transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private transactionsService: TransactionsService,
    private _snackBar: MatSnackBar
  ) {}

  types: string[] = typesDB;

  amount: number = 0;
  selectedType: string = '';

  saveTransaction(): void {
    const data = { amount: this.amount, type: this.selectedType };

    this.transactionsService.saveTransaction(data).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', {
          duration: 2000,
        });

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
