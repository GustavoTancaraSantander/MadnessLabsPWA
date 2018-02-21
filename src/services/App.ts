declare var db;


export class AppService {

    all() {
        return db.collection("apps").get();
    }

    add(newApp) {
        return db.collection("apps").add(newApp);
    }
}