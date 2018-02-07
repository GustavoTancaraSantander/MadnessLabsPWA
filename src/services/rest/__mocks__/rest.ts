export class Rest {
    apiUrl: string;

    constructor(
    ) {

    }

    get(endpoint: string, options?: any) {
        return new Promise(resolve => {
            resolve('waa');
        });
    }
}