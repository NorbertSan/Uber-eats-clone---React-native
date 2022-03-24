import React, {useRef, useState} from 'react';
import {LayoutAnimation, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {IOrder} from '../../interfaces/order-interfaces';
import moment from 'moment';
import {Animated} from 'react-native';
import {Timestamp} from 'firebase/firestore/lite';
import {getDishImage} from '../Restaurant/RestaurantDishesItems';

interface PastOrdersProps {
  pastOrders: IOrder[];
  incrementPage: () => void;
}

const PastOrders: React.FC<PastOrdersProps> = ({pastOrders, incrementPage}) => {
  return (
    <FlatList
      onEndReached={incrementPage}
      data={pastOrders}
      style={{marginTop: 10, flex: 1}}
      renderItem={({item}) => <PastOrder pastOrder={item} />}
      ItemSeparatorComponent={() => <Divider width={10} color="#efefef" />}
    />
  );
};

interface PastOrderProps {
  pastOrder: IOrder;
}

const PastOrder: React.FC<PastOrderProps> = ({pastOrder}) => {
  const iconRotationAnimation = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleCollapseClick = () => {
    Animated.timing(iconRotationAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prevState => !prevState);
  };

  const spin = iconRotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={{padding: 15}}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Image
          style={{height: 80, width: 80, marginRight: 15, borderRadius: 15}}
          source={{uri: pastOrder.restaurantImage}}
        />

        <View style={{alignSelf: 'flex-start', flex: 1}}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: '500',
              fontSize: 16,
              flex: 1,
            }}>
            {pastOrder.restaurantName}
          </Text>
          <View style={{marginTop: 6}}>
            <Text>
              Pozycje {pastOrder.items.length} • {pastOrder.totalPrice}
            </Text>
            <Text>
              {/* @ts-ignore */}
              {moment(pastOrder.createdAt.toDate()).format('DD MMMM')}
            </Text>
          </View>
        </View>

        <Animated.View
          style={{
            marginLeft: 'auto',
            transform: [{rotate: spin}],
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#efefef',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleCollapseClick}>
            <Ionicon name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {expanded && (
        <>
          <Divider style={{marginVertical: 10}} />
          {pastOrder.items.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginVertical: 5,
              }}>
              <Image
                source={{uri: getDishImage(item.id)}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginRight: 15,
                }}
              />
              <View>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default PastOrders;
