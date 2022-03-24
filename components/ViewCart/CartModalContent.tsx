import {useNavigation} from '@react-navigation/native';
import {serverTimestamp} from 'firebase/firestore/lite';
import React from 'react';
import {ActivityIndicator, Alert, TouchableOpacity, View} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';

import {IOrder} from '../../interfaces/order-interfaces';
import {addOrderToFirestore} from '../../queries/OrderQueries';
import {CartState, useCartStore} from '../../store/cartStore';
import {RESTAURANT_DISHES} from '../Restaurant/RestaurantDishesItems';

interface CartModalContentProps {
  setModalVisible: (state: boolean) => void;
  restaurationId: number;
  restaurantName: string;
  image_url: string;
}

const CartModalContent: React.FC<CartModalContentProps> = ({
  setModalVisible,
  restaurationId,
  restaurantName,
  image_url,
}) => {
  const cartState: CartState = useCartStore(state => state);
  const {items, totalPrice} = cartState.restaurantCarts[restaurationId] ?? {};
  const navigation = useNavigation<any>();

  const createOrder = () => {
    const order: IOrder = {
      restaurantName,
      items,
      totalPrice,
      restaurationId,
      restaurantImage: image_url,
      createdAt: serverTimestamp(),
    };

    createOrderMutation.mutate(order);
  };

  const createOrderMutation = useMutation(addOrderToFirestore, {
    onSuccess: () => {
      setModalVisible(false);
      cartState.clearItems(restaurationId);
      navigation.navigate('order', {
        restaurantName,
        items: RESTAURANT_DISHES.filter(
          dish => !!items.find(item => item.id === dish.id),
        ),
        totalPrice,
      });
    },
    onError: () => {
      Alert.alert('Błąd', 'Nie udało się żlożyć zamówienia, spróbuj ponownie', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    },
  });

  const onOutsideModalClick = () => {
    if (!createOrderMutation.isLoading) {
      setModalVisible(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onOutsideModalClick}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}></TouchableOpacity>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          marginTop: 'auto',
          padding: 15,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 18,
            marginBottom: 40,
          }}>
          {restaurantName}
        </Text>
        {items?.map(item => (
          <React.Fragment key={item.id}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: '600'}}>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
            <Divider style={{marginVertical: 20}} />
          </React.Fragment>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <Text style={{fontWeight: '700', fontSize: 18}}>Całość</Text>
          <Text style={{fontSize: 18}}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: 'black',
            borderRadius: 30,
            width: 200,
            alignSelf: 'center',
            marginTop: 'auto',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          activeOpacity={0.5}
          disabled={createOrderMutation.isLoading}
          onPress={() => createOrder()}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
            Złóż zamówienie
          </Text>
          {createOrderMutation.isLoading && (
            <ActivityIndicator style={{marginLeft: 15}} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default CartModalContent;
