import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';

const RestaurantPlaceholder = () => {
  return (
    <View>
      <Placeholder style={{marginBottom: 50}} Animation={Fade}>
        <PlaceholderMedia
          style={{width: '100%', height: 150, marginBottom: 15}}
        />
        <PlaceholderLine width={80} style={{marginLeft: 15}} />
        <PlaceholderLine width={60} style={{marginLeft: 15}} />
      </Placeholder>

      <PlaceholderDishItem />
      <PlaceholderDishItem />
      <PlaceholderDishItem />
    </View>
  );
};

const PlaceholderDishItem = () => {
  return (
    <Placeholder Animation={Fade}>
      <Divider />
      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View style={{width: 200}}>
          <PlaceholderLine width={60} />
          <PlaceholderLine />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={20} />
        </View>
        <PlaceholderMedia style={{width: 100, height: 100}} />
      </View>
    </Placeholder>
  );
};

export default RestaurantPlaceholder;
