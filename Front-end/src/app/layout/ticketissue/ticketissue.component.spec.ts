import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TicketissueComponent } from './ticketissue.component';
import { TicketIssueModule } from './ticketissue.module';

describe('TicketissueComponent', () => {
    let component: TicketissueComponent;
    let fixture: ComponentFixture<TicketissueComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TicketIssueModule, BrowserAnimationsModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketissueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
