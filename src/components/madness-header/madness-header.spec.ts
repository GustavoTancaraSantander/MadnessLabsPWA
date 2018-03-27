import { flush, render } from '@stencil/core/testing';
import { MadnessHeader } from './madness-header';

describe('madness-header', () => {
  it('should build', () => {
    expect(new MadnessHeader()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [MadnessHeader],
        html: '<madness-header></madness-header>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('Your new madness-header component');
    });
  });
});