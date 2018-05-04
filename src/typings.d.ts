import firebase from 'firebase';

declare global {
    namespace MadnessLabs {
        namespace apps {
            export interface IDocument {
                description: string,
                name: string,
                icon: string,
                link: string
            }

            export interface IQueryDocumentSnapshot extends firebase.firestore.QueryDocumentSnapshot {
                data(options?: firebase.firestore.SnapshotOptions): IDocument;
            }

            export interface IColllection extends firebase.firestore.QuerySnapshot {
                readonly docs: IQueryDocumentSnapshot[];
            }

            export interface IDocumentSnapshot extends firebase.firestore.DocumentSnapshot {
                data(options?: firebase.firestore.SnapshotOptions): IDocument;
            }

            export interface IDocumentReference extends firebase.firestore.DocumentReference {
                get(): Promise<IDocumentSnapshot>
            }
        }
    }
}
