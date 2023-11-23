import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketapproveComponent } from './ticketapprove.component';

const routes: Routes = [
    {
        path: '',
        component: TicketapproveComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketapproveRoutingModule {}
