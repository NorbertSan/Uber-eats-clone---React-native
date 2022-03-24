import React from 'react';
import {Text} from 'react-native-elements';

interface RestaurantNameProps {
  name: string;
}

const RestaurantName: React.FC<RestaurantNameProps> = ({name}) => (
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 25,
    }}>
    {name}
  </Text>
);

export default RestaurantName;
