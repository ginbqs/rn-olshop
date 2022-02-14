import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import AccountScreen from '../screen/shop/AccoutScreen';
import CartScreen from '../screen/shop/CartScreen';
import FeedScreen from '../screen/shop/FeedScreen';
import HomeScreen from '../screen/shop/HomeScreen';
import OficialStoreScreen from '../screen/shop/OficialStoreScreen';
import OrderScreen from '../screen/shop/OrderScreen';
import ProductDetailScreen from '../screen/shop/ProductDetailScreen'
import ProductOverViewScreen from '../screen/shop/ProductOverViewScreen'
import TransactionScreen from '../screen/shop/TransactionScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabTop = createMaterialTopTabNavigator();

// function ProductNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="TabsTopFeed" component={TabsTopFeed} />
//       <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
//     </Stack.Navigator>
//   );
// }

function TabsTopFeed() {
  return (
    <TabTop.Navigator>
      <TabTop.Screen name="ProductOverViewScreen" component={ProductOverViewScreen}  />
      <TabTop.Screen name="OrderScreen" component={OrderScreen} />
    </TabTop.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'ios-copy' : 'ios-copy-outline';
          } else if (route.name === 'OficialStore') {
            iconName = focused ? 'shield-checkmark-sharp' : 'shield-checkmark-outline';
          } else if (route.name === 'Transaction') {
            iconName = focused ? 'card-sharp' : 'card-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary500,
        tabBarInactiveTintColor: Colors.secondary,
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} 
          options={{ headerShown: false }}
        />
      <Tab.Screen name="Feed" component={TabsTopFeed} 
          // options={{ headerShown: false }}
        />
      <Tab.Screen name="OficialStore" component={OficialStoreScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
