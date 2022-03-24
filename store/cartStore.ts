import {IRestaurantKeyInfo} from './../interfaces/restaurants-interfaces';
import create from 'zustand';
import zustandFlipper from 'react-native-flipper-zustand';
import * as R from 'ramda';

export interface ICartItem {
  id: number;
  title: string;
  price: string;
}

export interface RestaurantCart {
  items: ICartItem[];
  totalPrice: string;
  name: string;
  image_url: string;
  id: number;
}

export type CartState = {
  restaurantCarts: Record<number, RestaurantCart>;
  addItem: (restaurantInfo: IRestaurantKeyInfo, item: ICartItem) => void;
  removeItem: (id: number, restaurantId: number) => void;
  clearItems: (restaurantId: number) => void;
};

const calculateTotalPrice = (items: ICartItem[]): string =>
  items.reduce((acc, item) => {
    if (!acc) return item.price;

    const currency = acc.substring(0, 1);
    return `${currency}${(
      Number(acc.substring(1)) + Number(item.price.substring(1))
    ).toFixed(2)}`;
  }, '');

export const useCartStore = create<CartState>(
  zustandFlipper<CartState>(set => ({
    restaurantCarts: {},
    addItem: (restaurantInfo: IRestaurantKeyInfo, item: ICartItem) =>
      set((state: CartState) => {
        const newItems = [
          item,
          ...(state.restaurantCarts[restaurantInfo.id]?.items ?? []),
        ];
        return {
          ...state,
          restaurantCarts: {
            ...state.restaurantCarts,
            [restaurantInfo.id]: {
              items: newItems,
              totalPrice: calculateTotalPrice(newItems),
              name: restaurantInfo.name,
              image_url: restaurantInfo.image_url,
              id: restaurantInfo.id,
            },
          },
        };
      }),
    removeItem: (id: number, restaurantId: number) =>
      set((state: CartState) => {
        const newItems = (
          state.restaurantCarts[restaurantId]?.items ?? []
        ).filter(item => item.id !== id);

        const newRestaurantCarts = newItems.length
          ? {
              ...state.restaurantCarts,
              [restaurantId]: {
                ...state.restaurantCarts[restaurantId],
                items: newItems,
                totalPrice: calculateTotalPrice(newItems),
              },
            }
          : R.omit([String(restaurantId)], state.restaurantCarts);

        return {
          ...state,
          restaurantCarts: newRestaurantCarts,
        };
      }),
    clearItems: (restaurantId: number) =>
      set((state: CartState) => {
        return {
          ...state,
          restaurantCarts: R.omit(
            [String(restaurantId)],
            state.restaurantCarts,
          ),
        };
      }),
  })),
);
