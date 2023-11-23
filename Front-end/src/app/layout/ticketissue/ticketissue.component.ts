import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { EmployeeService } from '../../shared/services/employee/employee.service';
import { error } from 'console';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { EmployeeDetail } from '../../shared/services/employee/employee-detail.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TicketHelper } from '../../_helpers/leaners-helperClass';
import { ComonService } from './../../shared/services/comon.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './ticketissue.component.html',
    styleUrls: ['./ticketissue.component.scss','./ticketissue.css'],
    animations: [routerTransition()]
})
export class TicketissueComponent implements OnInit {

    submitted = false;
    ticketGroup : FormGroup;

    issueTypeList =[{name:'Hardware',id:2},{name:'Software',id:1}]
      employeeData: any[];
      civilstatus: any[];
      designation: any[];
      branch:any[];
      employeeFields : string[] = ["Id","Full Name","DOB","NIC","Calling Name","Brach","Action"];
      technicianList :any;
      displayedColumns: string[] = ["id", "ticketnumber", "prioritytype", "jobStatus"];
      inventoryList:any;
     prorityType = [{name:'High',id:1},{name:'Medium',id:2}]

     taskList: any;

     constructor(private router: Router,
        public employeeService:EmployeeService,
        public commonService: ComonService,private toastr: ToastrService,private fb:FormBuilder) {}

    


     ngOnInit() {

        this.ticketGroup = this.fb.group({
            issuedate :[new Date()],
            ticketnumber : [TicketHelper.systemIdGenratr('T_')],
            description :[''],
            issuetype :["Hardware"],
            ticketstatus :["Pending"],
            prioritytype :['High'],
            jobStatus :['Pending'],
            issuerId :['1',Validators.required],
            assignerId :['',Validators.required],
            inventoryId:['',Validators.required],
        })

        this.loadDefaultData()
    }

    get f(){
        return this.ticketGroup.controls;
    }

    loadDefaultData() {
        const emplyeeList = this.employeeService.refreshList();
        const inventory = this.commonService.getInventory();
        const task = this.commonService.geTask();
        forkJoin([emplyeeList,task, inventory]) //we can use more that 2 api request 
        .subscribe(
            
            (result:any) => {
                //this will return list of array of the result
                this.technicianList = result[0];
                this.technicianList.filter(t=>t.designation === 'Technician');
                this.inventoryList = result[2].data;
                this.taskList = result[1].data;
            }
        )
        
    }

      //submit data
      onSubmit(form:NgForm){

        
            this.submitted = true;

            this.commonService.saveTicket(this.ticketGroup.value)
            .subscribe(
                res=>{
                    console.log(res);
                    this.toastr.success('Save Successfully','Ticket saved')
                    console.log("Success Submit ",res);
                    this.loadDefaultData();    
                }
            )

       
      }


      //reset fields
      resetData(form:NgForm){
       this.toastr.warning('Successfully','Reset Form') 
      }


       //fill data
       fillData(selectedData: any){
        console.log("KOOO ",selectedData);
        
            this.employeeService.fromData = Object.assign({},selectedData) ;   
        
        }



}
