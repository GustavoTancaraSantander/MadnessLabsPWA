import { DatabaseService } from './Database';

export class AppService {

    db: DatabaseService = new DatabaseService;

    /**
     * Get list of apps from firestore
     * @returns       Promise
     */
    all() {
        return new Promise((resolve, reject) => {
            var appsArr = [];
            const appCollection = this.db.instance.collection("apps");
            appCollection.get().then((apps) => {
                apps.forEach((app) => {
                    appsArr.push(app.data());
                });

                resolve(appsArr);
            }).catch((e) => {
                reject(e);
            });

        });
    }

    async find(id: string) {
        return this.db.instance.collection('apps').doc(id).get();
    }

    /**
     * Add an app to list on firestore
     * @param newApp The new app's information
     * @returns       Promise
     */
    add(newApp: MadnessLabs.apps.IDocument) {
        return this.db.instance.collection("apps").add(newApp);
    }
}