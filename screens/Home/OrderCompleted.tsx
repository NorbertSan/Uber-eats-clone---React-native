import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RestaurantDish from '../../components/Restaurant/RestaurantDish';
import {IDish} from '../../components/Restaurant/RestaurantDishesItems';
import LottieView from 'lottie-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RouteParamsList} from '../../interfaces/route-params-interfaces';

const OrderCompleted = () => {
  const buttonAnimationOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();

  const {restaurantName, items, totalPrice} =
    useRoute<RouteProp<RouteParamsList, 'order'>>().params;

  const displayReadyButton = () => {
    Animated.timing(buttonAnimationOpacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const goToHomePage = () => {
    navigation.navigate('restaurantsList');
  };

  return (
    <SafeAreaView style={{padding: 15, flex: 1, backgroundColor: '#fff'}}>
      <LottieView
        onAnimationFinish={displayReadyButton}
        source={require('../../assets/animations/check-mark.json')}
        autoPlay
        loop={false}
        speed={0.6}
        style={{height: 100, alignSelf: 'center', marginBottom: 20}}
      />

      <View style={{marginBottom: 20}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          Twoje zamówienie w restauracji {restaurantName} na kwotę {totalPrice}{' '}
          zostało złożone.
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        {items.map((item: IDish, index: number) => (
          <RestaurantDish readonly={true} key={index} dish={item} />
        ))}
      </ScrollView>
      <Animated.View style={{opacity: buttonAnimationOpacity}}>
        <TouchableOpacity
          onPress={goToHomePage}
          style={{
            alignSelf: 'center',
            backgroundColor: '#eb4e4e',
            width: 140,
            paddingVertical: 15,
            borderRadius: 30,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Gotowe
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <LottieView
        source={require('../../assets/animations/cooking.json')}
        autoPlay
        style={{height: 150, alignSelf: 'center'}}
      />
    </SafeAreaView>
  );
};

export default OrderCompleted;
