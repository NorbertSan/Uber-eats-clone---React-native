import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

interface ErrorMessage {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessage> = ({children}) => {
  return (
    <View>
      <Text
        style={{
          padding: 15,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '500',
          marginTop: 30,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default ErrorMessage;
