import { FirstWordPipe } from './first-word.pipe';

describe('CountProductPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstWordPipe();
    expect(pipe).toBeTruthy();
  });
});
