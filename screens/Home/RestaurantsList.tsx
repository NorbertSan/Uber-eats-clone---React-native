import React, {useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import {useQuery} from 'react-query';

import Categories from '../../components/Categories/Categories';
import HomeHeader, {
  TransactionType,
} from '../../components/HomeHeader/HomeHeader';
import Restaurants from '../../components/Restaurants/Restaurants';
import {getRestaurants} from '../../queries/RestaurantQueries';

const RestaurantsList = () => {
  const [location, setLocation] = useState<string>('Kielce');
  const [transactionType, setTransactionType] =
    useState<TransactionType>('delivery');

  const {isLoading, error, data, refetch, isFetching} = useQuery(
    ['restaurantsList', transactionType, location],
    getRestaurants(location, transactionType),
    {
      staleTime: 5 * 60 * 1000,
    },
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <HomeHeader
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          setLocation={setLocation}
        />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="black"
              colors={['black']}
              refreshing={isFetching}
              onRefresh={refetch}
            />
          }>
          <Categories />
          <Restaurants error={error} loading={isLoading} restaurants={data} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RestaurantsList;
