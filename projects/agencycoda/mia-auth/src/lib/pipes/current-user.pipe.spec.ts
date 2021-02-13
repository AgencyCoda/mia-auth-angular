import { CurrentUserPipe } from './current-user.pipe';

describe('CurrentUserPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrentUserPipe();
    expect(pipe).toBeTruthy();
  });
});
