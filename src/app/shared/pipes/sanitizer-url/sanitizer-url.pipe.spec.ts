import { SanitizerUrlPipe } from './sanitizer-url.pipe';

describe('SanitizerUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizerUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
