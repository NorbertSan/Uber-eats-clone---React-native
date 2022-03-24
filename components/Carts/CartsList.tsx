import React, {useState} from 'react';
import {Image, Modal, TouchableOpacity, View} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {RestaurantCart, useCartStore} from '../../store/cartStore';
import CartModalContent from '../ViewCart/CartModalContent';

const CartsList = () => {
  const [restaurationId, setRestaurationId] = useState<number>();
  const [restaurantName, setRestaurantName] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {restaurantCarts} = useCartStore();

  const openCartModal = (item: RestaurantCart) => {
    setRestaurationId(item.id);
    setRestaurantName(item.name);
    setImageUrl(item.image_url);
    setModalVisible(true);
  };

  const renderItem = ({item}: {item: RestaurantCart}) => (
    <TouchableOpacity onPress={() => openCartModal(item)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Image
          source={{uri: item.image_url}}
          style={{width: 70, height: 70, borderRadius: 35, marginRight: 20}}
        />
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={{fontWeight: '500', fontSize: 16}}>{item.name}</Text>
          <View style={{marginTop: 6}}>
            <Text>
              Pozycje {item.items.length} • {item.totalPrice}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {restaurationId && restaurantName && imageUrl && (
        <Modal animationType="slide" transparent visible={modalVisible}>
          <CartModalContent
            restaurationId={restaurationId}
            restaurantName={restaurantName}
            image_url={imageUrl}
            setModalVisible={setModalVisible}
          />
        </Modal>
      )}

      <View>
        <Text style={{fontWeight: '500', fontSize: 20}}>Koszyki</Text>
        <FlatList
          style={{marginTop: 20}}
          data={Object.values(restaurantCarts)}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </>
  );
};

export default CartsList;
