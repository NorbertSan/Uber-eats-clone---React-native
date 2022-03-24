import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {ICategory, IRestaurant} from '../../interfaces/restaurants-interfaces';

interface RestaurantInfoProps {
  restaurant: IRestaurant;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({restaurant}) => {
  const categoriesInfoText = restaurant.categories.reduce(
    (acc, {title}) => acc + `${title} • `,
    '',
  );

  const fullDescription =
    categoriesInfoText +
    ` ${restaurant.price} • ${restaurant.rating} ⭐️ (${restaurant.review_count})`;

  return (
    <View style={{marginTop: 6}}>
      <Text>{fullDescription}</Text>
    </View>
  );
};

export default RestaurantInfo;
