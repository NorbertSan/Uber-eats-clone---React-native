import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';

import {RouteParamsList} from '../../interfaces/route-params-interfaces';
import {useCartStore} from '../../store/cartStore';
import ViewCartButton from '../ViewCart/ViewCartButton';
import RestaurantDish from './RestaurantDish';
import {RESTAURANT_DISHES} from './RestaurantDishesItems';

const RestaurantDishes = () => {
  const {restaurationId} =
    useRoute<RouteProp<RouteParamsList, 'aboutRestaurant'>>().params;
  const cartItems =
    useCartStore(state => state.restaurantCarts[restaurationId]?.items) ?? [];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {RESTAURANT_DISHES.map((dish, index) => (
          <RestaurantDish
            defaultIsChecked={
              !!cartItems.find(cartItem => cartItem.id === dish.id)
            }
            key={index}
            dish={dish}
          />
        ))}
      </ScrollView>

      {cartItems.length > 0 && <ViewCartButton />}
    </>
  );
};

export default RestaurantDishes;
