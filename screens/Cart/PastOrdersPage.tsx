import {useNavigation} from '@react-navigation/native';
import {DocumentData} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {QueryClient, useQuery} from 'react-query';

import PastOrders from '../../components/PastOrders/PastOrders';
import PastOrdersPlaceholder from '../../components/PastOrders/PastOrdersPlaceholder';
import {mapDocumentToData} from '../../helpers/firestore-documents-helpers';
import {IOrder} from '../../interfaces/order-interfaces';
import {getPastOrders, ORDERS_LIMIT} from '../../queries/OrderQueries';

const PastOrdersPage = () => {
  const queryClient = new QueryClient();

  const [allOrdersFetched, setAllOrdersFetched] = useState<boolean>(false);
  const [lastOrderVisible, setLastOrderVisible] = useState<DocumentData>();
  const [pastOrders, setPastOrders] = useState<IOrder[]>([]);
  const navigation = useNavigation<any>();

  const {isLoading, error, data, refetch} = useQuery(
    ['getPastOrders', lastOrderVisible],
    () => getPastOrders(lastOrderVisible),
    {
      enabled: !allOrdersFetched,
    },
  );

  useEffect(() => {
    const newLastOrderVisible = data?.[data?.length - 1];

    if (newLastOrderVisible) {
      if (data.length !== ORDERS_LIMIT) {
        setAllOrdersFetched(true);
      }
      setLastOrderVisible(newLastOrderVisible);
      setPastOrders(prevState => [
        ...prevState,
        ...mapDocumentToData(data ?? []),
      ]);
    }
  }, [data]);

  const incrementPage = () => {
    queryClient.refetchQueries('getPastOrders');
  };

  const goToRestaurantsList = () => {
    navigation.navigate('restaurantsList');
  };

  if (isLoading && pastOrders.length === 0) {
    return <PastOrdersPlaceholder />;
  }

  if (error) {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          Nie można pobrać danych, spróbuj ponownie później
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}>
        {pastOrders.length !== 0 && (
          <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}>
            Poprzednie zamówienia
          </Text>
        )}
      </View>

      {pastOrders.length ? (
        <PastOrders incrementPage={incrementPage} pastOrders={pastOrders} />
      ) : (
        <TouchableOpacity
          onPress={goToRestaurantsList}
          style={{
            marginTop: 60,
            alignSelf: 'center',
            padding: 15,
            borderRadius: 30,
            backgroundColor: '#efefef',
          }}>
          <Text style={{fontWeight: '400'}}>
            Złóz swoje pierwsze zamówienie
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PastOrdersPage;
