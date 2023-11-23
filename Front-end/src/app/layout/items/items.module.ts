import { CommonModule } from '@angular/common';
// import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { PageHeaderModule } from '../../shared';

import { ItemRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';

// import { TablesModule } from '../tables/tables.module';
import { TablesModule } from '../tables/tables.module';
import { TablesComponent } from '../tables/tables.component';


@NgModule({
    imports: [CommonModule, ItemRoutingModule, PageHeaderModule,TablesModule],
    declarations: [],
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ItemModule {}
