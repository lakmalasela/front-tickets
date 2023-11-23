import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TicketapproveComponent } from './ticketapprove.component';
import { TicketapproveModule } from './ticketapprove.module';

describe('EmployeeComponent', () => {
    let component: TicketapproveComponent;
    let fixture: ComponentFixture<TicketapproveComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TicketapproveModule, BrowserAnimationsModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketapproveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
