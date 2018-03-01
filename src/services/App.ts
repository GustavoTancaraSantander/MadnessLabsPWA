import { DatabaseService } from './Database';

interface INewApp {
    name: string,
    icon: string,
    link: string
}

export class AppService {

    Database: DatabaseService = new DatabaseService;

    /**
     * Get list of apps from firestore
     * @returns       Promise
     */
    all() {
        return new Promise((resolve, reject) => {
            var appsArr = [];
            this.Database.instance.collection("apps").get().then((apps) => {
                apps.forEach((app) => {
                    appsArr.push(app.data());
                });

                resolve(appsArr);
            }).catch((e) => {
                reject(e);
            });

        });
    }

    /**
     * Add an app to list on firestore
     * @param newApp The new app's information
     * @returns       Promise
     */
    add(newApp: INewApp) {
        return this.Database.instance.collection("apps").add(newApp);
    }
}