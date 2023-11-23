import { TicketapproveModule } from './ticketapprove.module';


describe('FormModule', () => {
    let employeeModule: TicketapproveModule;

    beforeEach(() => {
        employeeModule = new TicketapproveModule();
    });

    it('should create an instance', () => {
        expect(employeeModule).toBeTruthy();
    });
});
