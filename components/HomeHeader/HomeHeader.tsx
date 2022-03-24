import React from 'react';
import {View} from 'react-native';

import HomeHeaderButton from './HomeHeaderButton';
import SearchInput from './SearchInput';

export type TransactionType = 'delivery' | 'pickup';

interface HomeHeaderProps {
  transactionType: TransactionType;
  setTransactionType: (value: TransactionType) => void;
  setLocation: (location: string) => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  transactionType,
  setTransactionType,
  setLocation,
}) => {
  const changeActiveTab = (tab: TransactionType): void =>
    setTransactionType(tab);

  return (
    <View style={{backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 12,
        }}>
        <HomeHeaderButton
          changeActiveTab={changeActiveTab}
          text="Dostawa"
          active={transactionType === 'delivery'}
          tabType="delivery"
        />
        <HomeHeaderButton
          changeActiveTab={changeActiveTab}
          text="Odbiór"
          active={transactionType === 'pickup'}
          tabType="pickup"
        />
      </View>
      <SearchInput setLocation={setLocation} />
    </View>
  );
};

export default HomeHeader;
