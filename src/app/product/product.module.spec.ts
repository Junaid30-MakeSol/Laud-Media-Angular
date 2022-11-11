import { ProductModule } from './product.module';

describe('AdminModule', () => {
  let adminModule: ProductModule;

  beforeEach(() => {
    adminModule = new ProductModule();
  });

  it('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});
