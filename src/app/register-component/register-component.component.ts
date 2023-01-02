import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit{
  form: FormGroup | any;
  loading = false;
  submitted = false;
  fieldRequired: string = "This field is required"
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.form = new FormGroup(
      {'username': new FormControl(null,[Validators.required]),
        'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
        'password': new FormControl(null, [Validators.required, this.checkPassword]),
      });
  }
  checkValidation(input: string){
    return this.form.get(input).invalid && (this.form.get(input).dirty || this.form.get(input).touched);
  }

  emailErrors() {
    return this.form.get('email').hasError('required') ? 'This field is required' :
      this.form.get('email').hasError('pattern') ? 'Not a valid email address' :''
  }
  checkPassword(control: { value: any; }) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.form.get('password').hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.form.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  onSubmit() {
    const { username, email, password } = this.form;
    this.authenticationService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
