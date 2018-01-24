import { flush, render } from '@stencil/core/testing';
import { AppApps } from './app-apps';

describe('app-apps', () => {
  it('should build', () => {
    expect(new AppApps()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [AppApps],
        html: '<app-apps></app-apps>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('Your new app-apps component');
    });
  });
});