import { TicketIssueModule } from './ticketissue.module';


describe('FormModule', () => {
    let employeeModule: TicketIssueModule;

    beforeEach(() => {
        employeeModule = new TicketIssueModule();
    });

    it('should create an instance', () => {
        expect(employeeModule).toBeTruthy();
    });
});
