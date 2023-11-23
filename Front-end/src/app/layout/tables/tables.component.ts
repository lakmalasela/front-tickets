import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { KeyValue } from '@angular/common';




@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    constructor() {}


    @Input() data: any[];
  
    p: any = 1; 
    @Input() headers: string[];

    @Input() displayColumn: string[];

    getObjectKeys(obj: any): string[] {
        return Object.keys(obj);
      }



    //fill data 
   @Output() passData = new EventEmitter();

   fillData(obj:any){
        this.passData.emit(obj);
   }

   //delete data

   @Output() deleteDataitem = new EventEmitter();

   deleteData(deleteobj: any){
        this.deleteDataitem.emit(deleteobj);
   }
      
    


    ngOnInit() {


    }


    page: number = 1;
    
}
