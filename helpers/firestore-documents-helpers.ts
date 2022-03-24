import {DocumentData, QueryDocumentSnapshot} from 'firebase/firestore/lite';

export const mapDocumentToData = <T>(docs: QueryDocumentSnapshot<T>[]): T[] => {
  const data: T[] = [];
  docs.forEach((doc: DocumentData) => data.push(doc.data()));
  return data;
};
