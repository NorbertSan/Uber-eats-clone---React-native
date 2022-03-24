import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {TransactionType} from './HomeHeader';

interface HomeHeaderButtonProps {
  text: string;
  active: boolean;
  changeActiveTab: (tab: TransactionType) => void;
  tabType: TransactionType;
}

const HomeHeaderButton: React.FC<HomeHeaderButtonProps> = ({
  text,
  active,
  changeActiveTab,
  tabType,
}) => {
  return (
    <TouchableOpacity
      onPress={() => changeActiveTab(tabType)}
      style={{
        backgroundColor: active ? 'black' : 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 30,
      }}>
      <Text
        style={{
          color: active ? 'white' : 'black',
          fontSize: 15,
          fontWeight: '900',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeHeaderButton;
