import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,) { }

  ngOnInit() : void {

  }

  onLogin(): void {
    this.auth.login();
    this.router.navigateByUrl('/facesnaps');
  }
}
