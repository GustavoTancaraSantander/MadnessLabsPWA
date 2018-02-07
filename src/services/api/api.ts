export class API {
    get() {
        return new Promise(resolve => {
            resolve('wee');
        });
    }

    post() {
        return 'dogs rock';
    }
}