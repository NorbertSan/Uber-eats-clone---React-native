import React from 'react';
import {View} from 'react-native';
import {
  Placeholder,
  Fade,
  PlaceholderMedia,
  PlaceholderLine,
} from 'rn-placeholder';

const PastOrdersPlaceholder = () => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <PastOrderPlaceholder />
      <PastOrderPlaceholder />
      <PastOrderPlaceholder />
      <PastOrderPlaceholder />
    </View>
  );
};

const PastOrderPlaceholder = () => {
  return (
    <Placeholder style={{marginTop: 20}} Animation={Fade}>
      <View style={{flexDirection: 'row'}}>
        <PlaceholderMedia
          style={{width: 80, height: 80, borderRadius: 5, marginRight: 10}}
        />
        <View style={{flex: 1}}>
          <PlaceholderLine width={40} />
          <PlaceholderLine width={80} />
        </View>
      </View>
    </Placeholder>
  );
};

export default PastOrdersPlaceholder;
