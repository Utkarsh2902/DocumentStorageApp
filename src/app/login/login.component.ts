import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private formbuilber: FormBuilder, private http: HttpClient, private router: Router) {
  }
  ngOnInit(): void {
    this.loginForm=this.formbuilber.group({
    email: [''],
      password: ['']
  })
}
login(){
  this.http.get<any>("http://localhost:3000/authentication")
    .subscribe(res => {
      const user = res.find((u: any) => {
        return u.email === this.loginForm.value.email && u.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Sucessful")
        this.loginForm.reset();
        this.router.navigate(['files'])
      }else{
        alert("User not found");
      }
    },err=>{
      alert("Something went wrong")
    })
}
}

