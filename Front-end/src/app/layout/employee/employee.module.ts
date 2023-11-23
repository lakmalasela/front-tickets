import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';

import { TablesModule } from '../tables/tables.module';
import { TablesComponent } from '../tables/tables.component';


@NgModule({
    imports: [CommonModule, EmployeeRoutingModule, PageHeaderModule,TablesModule],
    declarations: [],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeeModule {}
