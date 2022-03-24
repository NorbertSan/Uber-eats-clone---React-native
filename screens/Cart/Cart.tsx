import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import CartsList from '../../components/Carts/CartsList';
import EmptyCarts from '../../components/Carts/EmptyCarts';
import OrdersButton from '../../components/OrdersButton/OrdersButton';
import {useCartStore} from '../../store/cartStore';

const Cart = () => {
  const {restaurantCarts} = useCartStore();

  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 15, backgroundColor: '#fff'}}>
      <OrdersButton />
      {Object.keys(restaurantCarts).length ? <CartsList /> : <EmptyCarts />}
    </SafeAreaView>
  );
};

export default Cart;
