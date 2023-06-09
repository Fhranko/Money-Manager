import { Component, OnInit } from '@angular/core';
import { types as typesDB } from '../../../assets/fakeDatabase';
import { TransactionsService } from './../../services/transactions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypesService } from './../../services/types.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
  }

  saveTransaction(): void {
    const data = { amount: this.amount, type: this.selectedType };

    this.transactionsService.saveTransaction(data).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', {
          duration: 2000,
        });

        console.log(response);

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
