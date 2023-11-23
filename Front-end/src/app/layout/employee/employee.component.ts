import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { EmployeeService } from '../../shared/services/employee/employee.service';
import { error } from 'console';
import { NgForm, NgModel } from '@angular/forms';
import { EmployeeDetail } from '../../shared/services/employee/employee-detail.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss','./employee.css'],
    animations: [routerTransition()]
})
export class EmployeeComponent implements OnInit {

      employeeData: any[];
      civilstatus: any[];
      designation: any[];
      branch:any[];
      employeeFields : string[] = ["Id","Full Name","DOB","NIC","Calling Name","Brach","Action"];

      displayedColumns: string[] = ["id", "fullname", "dob", "nic", "callingname","branch"];


      //submit data
      onSubmit(form:NgForm){
        
        if(form.valid){

            this.service.postEmployee()
            .subscribe({
                next: res =>{
                    this.service.list = res as EmployeeDetail[];
                    this.service.resetFrom(form);
                    this.toastr.success('Inserted Successfully','Employee Register')
                    console.log("Success Submit ",res);
                    
                },
                error: err => {console.log(err);
                }
            })
        }else{
            this.toastr.error("Some Fields are Not fill");


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


      //reset fields
      resetData(form:NgForm){
        this.service.resetFrom(form);
        this.toastr.warning('Successfully','Reset Form') 
      }




    UpdateEmployee(form:NgForm){

               
        if(form.valid){

            this.service.upDateEmployee()
            .subscribe({
                next: res =>{
                    this.service.list = res as EmployeeDetail[];
                    this.service.resetFrom(form);
                    this.toastr.info('Updated Successfully','Employee')
                    console.log("Success Submit ",res);
                    
                },
                error: err => {console.log(err);
                }
            })
        }else{
            this.toastr.error("Some Fields are Not fill");


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

      //fill data
      fillData(selectedData: EmployeeDetail){
        console.log("KOOO ",selectedData);
        
            this.service.fromData = Object.assign({},selectedData) ;   
        
        }

        //delete
        deleteData(id: number){

           
            
            this.service.deleteEmployee(id)
            .subscribe({
                next: res =>{
                    this.service.list = res as EmployeeDetail[];
                    this.toastr.error('Deleted Successfully','Employee')
                    console.log("Success Submit ",res);
                    
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigate([this.router.url]);
                },
                error: err => {console.log(err);
                }
            })     
                
        }


    constructor(private router: Router,public service: EmployeeService,private toastr: ToastrService) {}

    ngOnInit() {
        
        //get all employees
        this.service.refreshList().subscribe(
            (data: any[])=>{
                this.employeeData = data;
                console.log(this.employeeData);
                
            },
            error=>{
                console.error("Error Fetching Employee",error);
                
            }
        )

        //get civil status
        this.service.getCivilstatus().subscribe(
            (data:any[])=>{
                this.civilstatus = data;
                console.log("Status ",this.civilstatus);
                
            },
            error=>{
                console.error("Error Fetching Status",error);
                
            }
        )

        //get the designation
        this.service.getDesignation().subscribe(
            (data:any[])=>{
                this.designation = data;
                console.log("Designation ",this.designation);
                
            },
            error=>{
                console.error("Error Fetching Status",error);
                
            }
        )

        //get branch
        this.service.getBranch().subscribe(
            (data:any[])=>{
                this.branch = data;
                console.log("Branch ",this.branch);
                
            },
            error=>{
                console.error("Error Fetching Status",error);
                
            }
        )
        


        


        // this.service.refreshList();



         
    }
}
