import { ItemModule } from './items.module';


describe('FormModule', () => {
    let itemModule: ItemModule;

    beforeEach(() => {
        itemModule = new ItemModule();
    });

    it('should create an instance', () => {
        expect(itemModule).toBeTruthy();
    });
});
