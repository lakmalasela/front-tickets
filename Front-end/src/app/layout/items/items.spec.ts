import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ItemsComponent } from './items.component';
import { ItemModule } from './items.module';

describe('ItemsComponent', () => {
    let component: ItemModule;
    let fixture: ComponentFixture<ItemModule>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ItemModule, BrowserAnimationsModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
