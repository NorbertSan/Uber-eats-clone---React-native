import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';

const OrdersButton = () => {
  const navigation = useNavigation<any>();

  const goToPastOrders = () => {
    navigation.navigate('pastOrders');
  };

  return (
    <TouchableOpacity
      onPress={goToPastOrders}
      activeOpacity={0.6}
      style={{
        alignSelf: 'flex-end',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#efefef',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Ionicon name="receipt-outline" size={18} style={{marginRight: 8}} />
      <Text style={{fontWeight: '500'}}>Zamówienia</Text>
    </TouchableOpacity>
  );
};

export default OrdersButton;
