import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { JWTtoken } from 'src/app/model/JWTtoken';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  profileForm: FormGroup;
  userToken : JWTtoken;
  submitted = false;
  success = false;
  loginErr: String;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private msgService :MessageService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',Validators.required]
    });
  }


  // onSubmit() {
  //   this.submitted = true;
  //   if (this.profileForm.invalid) {
  //     return;
  //   }
  //   this.msgService.clear();
  //   this.loginService.getAuthToken(this.profileForm.value)
  //       .subscribe(res => {
  //           this.userToken = <JWTtoken>res;
  //           this.success = true;
  //           sessionStorage.setItem("authToken","Token " + this.userToken.token);
  //           if(this.msgService.messages.length == 0){
  //             this.router.navigate(['/userdashboard'])
  //           }
  //       });
  // }

  onSubmit() {
      this.router.navigate(['/userdashboard'])
  }
  newUser(){
    this.router.navigate(['/signUp'])
  }

}
