import { flush, render } from '@stencil/core/testing';
import { MadnessCastRater } from './madness-cast-rater';

describe('madness-cast-rater', () => {
  it('should build', () => {
    expect(new MadnessCastRater()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [MadnessCastRater],
        html: '<madness-cast-rater></madness-cast-rater>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('Your new madness-cast-rater component');
    });
  });
});