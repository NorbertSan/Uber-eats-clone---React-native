import React from 'react';
import {View} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const RestaurantsPlaceholder = () => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <RestaurantPlaceholder />
      <RestaurantPlaceholder />
      <RestaurantPlaceholder />
    </View>
  );
};

export default RestaurantsPlaceholder;

const RestaurantPlaceholder = () => (
  <Placeholder style={{marginTop: 15}} Animation={Fade}>
    <PlaceholderMedia style={{width: '100%', height: 150}} />
    <PlaceholderLine style={{marginTop: 10}} width={40} />
    <PlaceholderLine width={80} />
  </Placeholder>
);
