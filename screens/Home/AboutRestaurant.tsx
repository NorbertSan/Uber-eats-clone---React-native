import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {useQuery} from 'react-query';

import ErrorMessage from '../../components/Error/ErrorMessage';
import RestaurantDishes from '../../components/Restaurant/RestaurantDishes';
import RestaurantHeader from '../../components/Restaurant/RestaurantHeader';
import RestaurantPlaceholder from '../../components/Restaurant/RestaurantPlaceholder';
import {RouteParamsList} from '../../interfaces/route-params-interfaces';
import {getSingleRestaurant} from '../../queries/RestaurantQueries';

const AboutRestaurant = () => {
  const {params} = useRoute<RouteProp<RouteParamsList, 'aboutRestaurant'>>();

  const {isLoading, error, data} = useQuery(
    ['restaurant', params.restaurationId],
    getSingleRestaurant(params.restaurationId),
    {
      staleTime: Infinity,
    },
  );

  if (error) {
    return (
      <View style={{marginTop: 30}}>
        <ErrorMessage>
          Nie udało się pobrać danych restauracji, spróbuj ponownie później 🙁
        </ErrorMessage>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <RestaurantPlaceholder />
      </View>
    );
  }

  if (data) {
    return (
      <View style={{flex: 1}}>
        <RestaurantHeader restaurant={data} />
        <RestaurantDishes />
      </View>
    );
  }

  return null;
};

export default AboutRestaurant;
