import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from '../shared/services/login/login.service';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { LoginDetail } from '../shared/services/login/login-details.model';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router,public service:LoginService,private toastr: ToastrService) {}
 
    ngOnInit() {}

    // onSubmit(form:NgForm){

    //     this.service.loginUser()
    //     .subscribe({
    //         next: res =>{

    //             this.service.loginData = res ;
    //             this.service.resetFrom(form);
    //             this.toastr.success('Login Successfully!', 'Welcome');
     
    //             this.router.navigate(['/dashboard']);
    //         },
    //         error: err => {console.log(err);
    //         }
    //     })

    //     // if(form.valid){

            

          
    //     // }else{
    //     //     this.toastr.error("Some Fields are Not fill");


    //     //     Object.keys(form.controls).forEach(key => {
    //     //         const control = form.controls[key];
    //     //         if (control.invalid) {
    //     //             // Display error messages for specific errors
    //     //             if (control.errors?.required) {
    //     //                 this.toastr.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
    //     //             }
                  
    //     //         }
    //     //     });
    //     // }
       
    //   }

    onSubmit(form: NgForm) {

        console.log(form.value.username);
        
        if (form.valid) {
            this.service.loginUser(form.value.username, form.value.password)
            .subscribe({
                next: res => {
                    if (res.data) {
                        // Handle successful login
                        this.service.username = form.value.username;
                        this.service.resetFrom(form);
                        this.toastr.success('Login Successfully!', 'Welcome');
                        this.router.navigate(['/dashboard']);
                    } else {
                        // Handle unsuccessful login
                        this.toastr.error(res.message || 'Login failed. Please check your credentials.');
                    }
                },
                error: err => {
                    console.log('Error:', err);
                    this.toastr.error('An error occurred during login. Please try again.');
                }
            });
        
        } else {
            this.toastr.error("Some Fields are Not filled");

            Object.keys(form.controls).forEach(key => {
                const control = form.controls[key];
                if (control.invalid) {
                    // Display error messages for specific errors
                    if (control.errors?.required) {
                        this.toastr.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
                    }
                }
            });
        }
    }



    }

    // onLoggedin() {



         
    




    //     localStorage.setItem('isLoggedin', 'true');
    // }


