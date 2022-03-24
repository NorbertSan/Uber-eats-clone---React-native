import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useRef, useState} from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';

import {IRestaurant} from '../../interfaces/restaurants-interfaces';

interface IRestaurantItemProps {
  restaurant: IRestaurant;
}

const RestaurantItem: React.FC<IRestaurantItemProps> = ({restaurant}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const likeAnimationProgress = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<any>();

  const goToRestaurantDetails = () => {
    navigation.navigate('aboutRestaurant', {
      restaurationId: restaurant.id,
      restaurantName: restaurant.name,
      image_url: restaurant.image_url,
    });
  };

  const handleLikeClick = () => {
    const newProgressValue = isLiked ? 0 : 0.5;

    Animated.timing(likeAnimationProgress, {
      toValue: newProgressValue,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsLiked(prevState => !prevState));
  };

  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity
        onPress={handleLikeClick}
        activeOpacity={0.9}
        style={{
          position: 'absolute',
          top: 35,
          right: 25,
          zIndex: 999,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 50,
        }}>
        <LottieView
          source={require('../../assets/animations/heart-like.json')}
          style={{
            width: 65,
            height: 65,
          }}
          progress={likeAnimationProgress}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: 15,
          backgroundColor: 'white',
          padding: 15,
        }}>
        <TouchableOpacity activeOpacity={1} onPress={goToRestaurantDetails}>
          <Image
            style={{width: '100%', height: 150}}
            source={{uri: restaurant.image_url || undefined}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 15, marginTop: 10, fontWeight: '700'}}>
                {restaurant.name}
              </Text>
              <Text style={{color: 'grey'}}>35-45 • min</Text>
            </View>

            <View
              style={{
                backgroundColor: '#efefef',
                width: 30,
                height: 30,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{restaurant.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RestaurantItem;
