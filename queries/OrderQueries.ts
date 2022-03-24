import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore/lite';
import {DocumentReference, DocumentData, query} from 'firebase/firestore';
import {IOrder} from './../interfaces/order-interfaces';
import firestoreDb from '../firebase';

export const ORDERS_LIMIT = 6;

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const addOrderToFirestore = async (
  order: IOrder,
): Promise<DocumentReference<DocumentData>> => {
  return await (
    await addDoc(collection(firestoreDb, 'orders'), order)
  ).withConverter(converter<IOrder>());
};

export const getPastOrders = async (
  lastDocument: DocumentData | undefined,
): Promise<QueryDocumentSnapshot<IOrder>[]> => {
  const q = lastDocument
    ? query(
        collection(firestoreDb, 'orders'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDocument),
        limit(ORDERS_LIMIT),
      ).withConverter(converter<IOrder>())
    : query(
        collection(firestoreDb, 'orders'),
        orderBy('createdAt', 'desc'),
        limit(ORDERS_LIMIT),
      ).withConverter(converter<IOrder>());

  const querySnapshot = await getDocs<IOrder>(q);
  return querySnapshot.docs;
};
