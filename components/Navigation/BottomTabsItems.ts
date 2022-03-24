import {ComponentType} from 'react';

import Account from '../../screens/Account/Account';
import Browse from '../../screens/Browse/Browse';
import Cart from '../../screens/Cart/Cart';
import RestaurantsList from '../../screens/Home/RestaurantsList';

type BottomNavigationRoutes = 'restaurantsList' | 'browse' | 'cart' | 'account';
interface IBottomTab {
  title: string;
  name: BottomNavigationRoutes;
  icon: string;
  component: ComponentType;
}

export const BOTTOM_TABS: IBottomTab[] = [
  {
    title: 'Główna',
    name: 'restaurantsList',
    icon: 'home',
    component: RestaurantsList,
  },
  {
    title: 'Przeglądaj',
    name: 'browse',
    icon: 'search',
    component: Browse,
  },
  {
    title: 'Koszyki',
    name: 'cart',
    icon: 'cart',
    component: Cart,
  },
  {
    title: 'Konto',
    name: 'account',
    icon: 'person',
    component: Account,
  },
];
