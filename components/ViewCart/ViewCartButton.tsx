import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {RouteParamsList} from '../../interfaces/route-params-interfaces';

import {useCartStore} from '../../store/cartStore';
import CartModalContent from './CartModalContent';

const ViewCartButton = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {restaurationId, restaurantName, image_url} =
    useRoute<RouteProp<RouteParamsList, 'aboutRestaurant'>>().params;
  const {totalPrice} =
    useCartStore(state => state.restaurantCarts[restaurationId]) ?? {};

  return (
    <>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <CartModalContent
          restaurationId={restaurationId}
          restaurantName={restaurantName}
          image_url={image_url}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={{
          alignSelf: 'center',
          position: 'absolute',
          backgroundColor: 'black',
          padding: 15,
          borderRadius: 20,
          bottom: 30,
          width: 200,
          zIndex: 999,
        }}>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
          Zobacz koszyk {totalPrice}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ViewCartButton;
