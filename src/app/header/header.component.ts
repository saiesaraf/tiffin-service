import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponentComponent} from "../register-component/register-component.component";
import {LoginComponent} from "../login/login.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from "../services/authentication.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNotLoggedIn : boolean = false;
  isRegisterSuccessful: boolean = false;
  @ViewChild('googleBtnRef')
  googleBtn?: ElementRef;

  user?: SocialUser;
  isButtonClicked: any = false;
  constructor(
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              public socialAuthService: SocialAuthService) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user:SocialUser) => {
      this.user = user;
      if(this.user === null) {
        this.isNotLoggedIn = false;
      }else {
        this.isNotLoggedIn = true;
      }
      console.log('user is', user);
    });
  }

  logout() {
    this.socialAuthService.signOut().then(() => {
      this.isNotLoggedIn = false;
      this.user = undefined;
      this.isButtonClicked = false;
    });
  }

  signInWithGoogle() {
    this.isButtonClicked = true;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
