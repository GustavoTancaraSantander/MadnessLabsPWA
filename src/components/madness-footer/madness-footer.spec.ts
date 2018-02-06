import { flush, render } from '@stencil/core/testing';
import { MadnessFooter } from './madness-footer';

describe('madness-footer', () => {
  it('should build', () => {
    expect(new MadnessFooter()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [MadnessFooter],
        html: '<madness-footer></madness-footer>'
      });
    });

    it('should work without parameters', async () => {
      await flush(element);
      expect(element.textContent).toEqual('');
    });
  });
});