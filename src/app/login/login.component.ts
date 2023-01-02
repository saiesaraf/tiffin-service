import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isNotLoggedIn: boolean = false;
  isButtonClicked: any = false;
  user?: SocialUser;

  constructor(
    public socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.isNotLoggedIn = this.user !== null;
    });
  }

  signInWithGoogle() {
    this.isButtonClicked = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}

