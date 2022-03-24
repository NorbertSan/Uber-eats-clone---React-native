import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {useCartStore} from '../../store/cartStore';
import {BOTTOM_TABS} from './BottomTabsItems';

const BottomTab = createBottomTabNavigator();

const BottomNavigation = () => {
  const {restaurantCarts} = useCartStore();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#ccc',
      }}
      initialRouteName="home">
      {BOTTOM_TABS.map(bottomTab => (
        <BottomTab.Screen
          key={bottomTab.name}
          options={{
            tabBarShowLabel: true,
            tabBarLabel: bottomTab.title,
            tabBarBadge:
              (bottomTab.name === 'cart' &&
                Object.keys(restaurantCarts).length) ||
              undefined,
            tabBarBadgeStyle: {backgroundColor: 'green'},
            tabBarIcon: ({color, size}) => (
              <Ionicon name={bottomTab.icon} size={size} color={color} />
            ),
          }}
          name={bottomTab.name}
          component={bottomTab.component}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
