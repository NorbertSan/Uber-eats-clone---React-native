import React from 'react';
import {View} from 'react-native';

import ErrorMessage from '../Error/ErrorMessage';
import RestaurantItem from './RestaurantItem';
import {IRestaurant} from '../../interfaces/restaurants-interfaces';
import RestaurantsPlaceholder from './RestaurantsPlaceholder';

interface IRestaurantsProps {
  restaurants: IRestaurant[] | undefined;
  loading: boolean;
  error: unknown;
}

const Restaurants: React.FC<IRestaurantsProps> = ({
  error,
  restaurants,
  loading,
}) => {
  if (loading) {
    return <RestaurantsPlaceholder />;
  }

  if (restaurants?.length === 0 || error) {
    return (
      <ErrorMessage>
        {error
          ? 'Coś poszło nie tak, spróbuj ponownie później'
          : 'Nie znaleziono restauracji na podanej lokalizacji ☹️'}
      </ErrorMessage>
    );
  }

  return (
    <View style={{backgroundColor: '#efefef'}}>
      {restaurants?.map(restaurant => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </View>
  );
};

export default Restaurants;
