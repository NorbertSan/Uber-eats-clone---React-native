import React from 'react';
import {View} from 'react-native';
import {Image} from 'react-native-elements';

import {IRestaurant} from '../../interfaces/restaurants-interfaces';
import RestaurantInfo from './RestaurantInfo';
import RestaurantName from './RestaurantName';

interface RestaurantHeaderProps {
  restaurant: IRestaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({restaurant}) => {
  return (
    <View>
      <Image
        source={{uri: restaurant.image_url}}
        style={{height: 150, width: '100%'}}
      />
      <View style={{padding: 15}}>
        <RestaurantName name={restaurant.name} />
        <RestaurantInfo restaurant={restaurant} />
      </View>
    </View>
  );
};

export default RestaurantHeader;
