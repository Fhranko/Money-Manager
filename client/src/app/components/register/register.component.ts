import { Component } from '@angular/core';
import { types as typesDB } from '../../../assets/fakeDatabase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  types: string[] = typesDB;
}
