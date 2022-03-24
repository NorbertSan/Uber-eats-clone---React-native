import React from 'react';
import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const EmptyCarts = () => {
  return (
    <View style={{marginTop: 50}}>
      <Text style={{textAlign: 'center', fontSize: 16}}>
        Twój koszyk jest pusty
      </Text>

      <LottieView
        source={require('../../assets/animations/sad-empty-box.json')}
        autoPlay
        style={{height: 400, alignSelf: 'center'}}
      />
    </View>
  );
};

export default EmptyCarts;
