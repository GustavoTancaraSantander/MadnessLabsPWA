jest.mock('./api');

import { API } from './api';

describe('API Service', () => {
    let APIService = new API();

    it('should load', () => {
        expect(APIService).toBeTruthy();
    });

    it('should GET request', () => {
        expect.assertions(1);
        return APIService.get().then(data => expect(data).toEqual('waa'));
    });

    it('should POST request', () => {
        expect(APIService.post()).toEqual('dogs rock');
    });
});