export class API {
    get() {
        return new Promise(resolve => {
            resolve('waa');
        });
    }

    post() {
        return 'dogs rock';
    }
}