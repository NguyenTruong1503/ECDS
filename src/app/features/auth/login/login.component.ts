import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatButton,
    MatDivider,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    handleGoogleLogin() {
        // Implement Google login logic here
        console.log('Google login clicked');
    }
}
