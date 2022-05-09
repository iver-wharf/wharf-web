import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'wh-login',
  templateUrl: './fake-login.component.html',
  styleUrls: ['./fake-login.component.scss'],
})
export class FakeLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.navigateBackToReturnUrl();
  }
}
