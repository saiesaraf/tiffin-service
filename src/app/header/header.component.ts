import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponentComponent} from "../register-component/register-component.component";
import {LoginComponent} from "../login/login.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import { SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";

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
              public socialAuthService: SocialAuthService,
              private router: Router,
              public dialog: MatDialog) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }
  ngOnInit(): void {

  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.dialog.closeAll();
    });
  }

  logout() {
    this.socialAuthService.signOut(true).then(() => {
      this.isNotLoggedIn = false;
      this.user = new SocialUser();
      console.log('user is', this.user);
      this.isButtonClicked = false;
      this.router.navigate(['/app-landing-page']);
    });
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.dialog.closeAll();
    });
  }
}
