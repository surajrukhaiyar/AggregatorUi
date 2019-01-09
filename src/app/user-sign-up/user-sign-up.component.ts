import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JWTtoken } from '../model/JWTtoken';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})
export class UserSignUpComponent implements OnInit {

  profileForm: FormGroup;
  userToken : JWTtoken;
  submitted = false;
  success = false;
  loginErr: String;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,private msgService :MessageService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required],
    });
  }


  onSubmit() {
    this.msgService.clear();
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }

   this.loginService.addUser(this.profileForm.value)
      .subscribe(res => {
          console.log(res);
          if(this.msgService.messages.length == 0){
            this.router.navigate(['/updateStatus']);
          }
        });
  }

  goToLogin(){
    this.router.navigate(['/updateStatus'])
  }
}
