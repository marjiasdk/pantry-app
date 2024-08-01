import { db } from '../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore';

export interface Item {
  id?: string; // Keep this as string | undefined to indicate it might not always be present
  name: string;
  quantity: string;
}

const itemConverter = {
  toFirestore(item: Item): DocumentData {
    return { name: item.name, quantity: item.quantity };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Item {
    const data = snapshot.data(options)!;
    return { id: snapshot.id, ...data } as Item;
  }
};

const pantryCollection = collection(db, 'pantryItems').withConverter(itemConverter);

export const addItem = async (item: Item) => {
  await addDoc(pantryCollection, itemConverter.toFirestore(item));
};

export const updateItem = async (id: string, updatedItem: Item) => {
  const itemDoc = doc(db, 'pantryItems', id).withConverter(itemConverter);
  await updateDoc(itemDoc, itemConverter.toFirestore(updatedItem));
};

export const deleteItem = async (id: string) => {
  const itemDoc = doc(db, 'pantryItems', id).withConverter(itemConverter);
  await deleteDoc(itemDoc);
};

export const getItems = async (): Promise<Item[]> => {
  const data = await getDocs(pantryCollection);
  return data.docs.map((doc) => doc.data());
};
