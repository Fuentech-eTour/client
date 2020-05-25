import { CountProductPipe } from './count-product.pipe';

describe('CountProductPipe', () => {
  it('create an instance', () => {
    const pipe = new CountProductPipe();
    expect(pipe).toBeTruthy();
  });
});
