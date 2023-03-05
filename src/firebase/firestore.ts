import { collection, addDoc, getDocs, DocumentData } from 'firebase/firestore';
import { Log } from '../config/log';
import { Source } from '../interfaces/source';
import { db } from './config';

const enum Collection {
  SOURCE = 'source'
}

export async function addSource(source: Source) {
  try {
    const docRef = await addDoc(collection(db, Collection.SOURCE), {
      ...source
    });
    Log.printInfo('Document written with ID: ', docRef.id);
  } catch (error) {
    Log.printError('Error adding document: ', error);
  }
}

export async function getSources(): Promise<DocumentData[] | undefined> {
  try {
    const querySnapshot = await getDocs(collection(db, Collection.SOURCE));
    const sources: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      Log.printDebug(`${doc.id} => ${JSON.stringify(doc.data())}`);
      sources.push(doc.data());
    });
    return sources;
  } catch (error) {
    Log.printError('Error getting getSources: ', error);
  }
}
