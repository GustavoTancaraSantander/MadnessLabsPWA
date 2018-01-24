import { flush, render } from '@stencil/core/testing';
import { AppCard } from './app-card';

describe('app-card', () => {
  it('should build', () => {
    expect(new AppCard()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [AppCard],
        html: '<app-card></app-card>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('Your new app-card component');
    });
  });
});