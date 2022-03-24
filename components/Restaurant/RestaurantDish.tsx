import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CheckBox, Divider, Image, Text} from 'react-native-elements';
import {RouteParamsList} from '../../interfaces/route-params-interfaces';

import {useCartStore} from '../../store/cartStore';
import {IDish} from './RestaurantDishesItems';

interface RestaurantDishProps {
  dish: IDish;
  defaultIsChecked?: boolean;
  readonly?: boolean;
}

const RestaurantDish: React.FC<RestaurantDishProps> = ({
  dish,
  defaultIsChecked = false,
  readonly = false,
}) => {
  const {restaurationId, restaurantName, image_url} =
    useRoute<RouteProp<RouteParamsList, 'aboutRestaurant'>>().params;

  const [checked, setChecked] = useState<boolean>(false);
  const {addItem, removeItem} = useCartStore(state => state);

  useEffect(() => {
    setChecked(defaultIsChecked);
  }, [defaultIsChecked]);

  const toggleItemInCart = () => {
    if (checked) {
      removeItem(dish.id, restaurationId);
    } else {
      addItem(
        {
          id: restaurationId,
          name: restaurantName,
          image_url,
        },
        {
          id: dish.id,
          title: dish.title,
          price: dish.price,
        },
      );
    }

    setChecked(prevState => {
      return !prevState;
    });
  };

  return (
    <>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 15,
          paddingVertical: 20,
        }}>
        {!readonly && (
          <CheckBox
            checked={checked}
            checkedColor="green"
            onPress={toggleItemInCart}
          />
        )}
        <View style={{width: 200}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>{dish.title}</Text>
          <Text>{dish.description}</Text>
          <Text>{dish.price}</Text>
        </View>
        <Image
          source={{uri: dish.image}}
          style={{borderRadius: 5, height: 100, width: 100}}
        />
      </View>
    </>
  );
};

export default RestaurantDish;
