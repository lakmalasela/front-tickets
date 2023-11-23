import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { EmployeeService } from '../../shared/services/employee/employee.service';
import { error } from 'console';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { EmployeeDetail } from '../../shared/services/employee/employee-detail.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TicketDetail } from '../../shared/services/ticket/ticket-details.models';
import { ComonService } from '../../shared/services/comon.service';
import { forkJoin } from 'rxjs';
import { TicketHelper } from '../../_helpers/leaners-helperClass';

@Component({
    selector: 'app-form',
    templateUrl: './ticketapprove.component.html',
    styleUrls: ['./ticketapprove.component.scss','./ticketapprove.css'],
    animations: [routerTransition()]
})
export class TicketapproveComponent implements OnInit {
    ticketGroup : FormGroup;
    
    get f(){
        return this.ticketGroup.controls;
    }

 
    
    submitted = false;
      employeeData: any[];
      civilstatus: any[];
      designation: any[];
      branch:any[];
      employeeFields : string[] = ["Id","Full Name","DOB","NIC","Calling Name","Brach","Action"];

      statusList =[{name:'Pending',id:1},{name:'Approve',id:2},{name:'Closed',id:1}]
      displayedColumns: string[] = ["id", "ticketnumber", "ticketstatus"];
      approveListArray:any;

      taskList: any;
      //submit data
      onSubmit(){

        this.commonService.updateTicket(this.ticketGroup.value.id,this.ticketGroup.value)
        .subscribe(
            res=>{
                console.log(res);
                this.toastr.success('Update Successfully','Ticket Updated')
                console.log("Success Submit ",res);
                this.loadDefaultData();
            }
        )
    
    

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
      fillData(data: any) {




        this.ticketGroup.controls['id'].setValue(data.id);
        this.ticketGroup.controls['ticketnumber'].setValue(data.ticketnumber);
        this.ticketGroup.controls['ticketstatus'].setValue(data.ticketstatus);
        this.ticketGroup.controls['issuedate'].setValue(data.issuedate);
        this.ticketGroup.controls['description'].setValue(data.description);
        this.ticketGroup.controls['issuetype'].setValue(data.issuetype);
        this.ticketGroup.controls['jobStatus'].setValue(data.jobStatus);
        this.ticketGroup.controls['prioritytype'].setValue(data.prioritytype);
        this.ticketGroup.controls['issuerId'].setValue(data.issuerId);
        this.ticketGroup.controls['assignerId'].setValue(data.assignerId);
        this.ticketGroup.controls['inventoryId'].setValue(data.inventoryId);
    
    
        console.log(data);
        if (data.items.issuetype === "Approve") {
            this.ticketGroup.controls['issuetype'].setValue(1);
          } else {
            // Set a default value or handle other conditions if needed
            // For example, if not "software," set it to 2
            this.ticketGroup.controls['issuetype'].setValue(2);
          }   
        this.ticketGroup.patchValue(
            
            {
                ticketnumber: data.items.ticketnumber,
          
          Unitprice: data.items.unitprice,
          
        //   itemType: data.items.itemtype,
          
          // ... other form controls
        });
    
    
     
    
    
    
     
    
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


    constructor(private router: Router,public service: EmployeeService,private toastr: ToastrService,public commonService: ComonService,public fb:FormBuilder) {}

    

    ngOnInit() {

      

        
      
     this.loadDefaultData()
    }

    loadDefaultData(){

        this.ticketGroup = this.fb.group({
           
            
            ticketstatus:['',Validators.required],
            id:[''],
            issuedate :[new Date()],
            ticketnumber : [TicketHelper.systemIdGenratr('T_')],
            description :[''],
            issuetype :[""],
           
            prioritytype :[''],
            jobStatus :[''],
            issuerId :['1',Validators.required],
            assignerId :['',Validators.required],
            inventoryId:['',Validators.required],
        })

        const task = this.commonService.geTask();
        forkJoin([task ]) //we can use more that 2 api request 
        .subscribe(
            
            (result:any) => {
                //this will return list of array of the result
          
                this.taskList = result[0].data;
            }
        )
        
    
    
        this.commonService.geTask()
        .subscribe
        ( (result:any)=>{
            this.approveListArray = result.data;
        })
    
     }
}
