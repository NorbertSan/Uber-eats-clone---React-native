import {Timestamp, FieldValue} from 'firebase/firestore/lite';

import {ICartItem} from './../store/cartStore';

export interface IOrder {
  createdAt: FieldValue;
  restaurantName: string;
  restaurantImage: string;
  restaurationId: number;
  items: ICartItem[];
  totalPrice: string;
}
