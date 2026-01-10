import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_services/login';
import { UserInterface } from '../../_interfaces/user';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);

  userProfile = signal<UserInterface | null>(null);

  ngOnInit() {
    const currentUser = this.loginService.getCurrentUser();

    if (currentUser) {
      this.userProfile.set(currentUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.loginService.logOut();

  }
}
