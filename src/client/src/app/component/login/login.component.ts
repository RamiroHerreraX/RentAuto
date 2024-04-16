import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router:Router
  ) {}

  login() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigateByUrl('/login');
}


}
