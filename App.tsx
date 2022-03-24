import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef} from 'react';
import {Platform, UIManager} from 'react-native';
import {setCustomText} from 'react-native-global-props';
import SplashScreen from 'react-native-splash-screen';
import {QueryClient, QueryClientProvider} from 'react-query';

import BottomNavigation from './components/Navigation/BottomNavigation';
import PastOrdersPage from './screens/Cart/PastOrdersPage';
import AboutRestaurant from './screens/Home/AboutRestaurant';
import OrderCompleted from './screens/Home/OrderCompleted';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

const customTextProps = {
  style: {
    color: 'black',
  },
};

setCustomText(customTextProps);

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="home" component={BottomNavigation} />
          <Stack.Screen name="aboutRestaurant" component={AboutRestaurant} />
          <Stack.Screen
            options={{gestureEnabled: false}}
            name="order"
            component={OrderCompleted}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              title: 'Twoje zamówienia',
              headerBackTitleVisible: false,
              headerTintColor: 'black',
            }}
            name="pastOrders"
            component={PastOrdersPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
