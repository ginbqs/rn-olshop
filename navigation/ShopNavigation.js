import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';

import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import CartScreen from '../screen/shop/CartScreen';
import FeedScreen from '../screen/shop/FeedScreen';
import HomeScreen from '../screen/shop/HomeScreen';
import OficialStoreScreen from '../screen/shop/OficialStoreScreen';
import OrderScreen from '../screen/shop/OrderScreen';
import ProductDetailScreen from '../screen/shop/ProductDetailScreen'
import ProductOverViewScreen from '../screen/shop/ProductOverViewScreen'
import TransactionScreen from '../screen/shop/TransactionScreen';
import BoughtScreen from '../screen/shop/Account/BoughtScreen';
import PostingScreen from '../screen/shop/Account/PostingScreen';
import PaymentScreen from '../screen/shop/PaymentScreen';
import UserProduckScreen from '../screen/user/UserProductScreen';
import EditProductScreen from '../screen/user/EditProductScreen'
import SignInScreen from '../screen/user/SignInScreen'
import SignUpScreen from '../screen/user/SignUpScreen'
import ButtonOpacity from '../components/ButtonOpacity';
import { Label } from '../components/Font';
import { View } from 'react-native-web';
import UserAddressScreen from '../screen/user/address/UserAddressScreen';
import EditUserAddressScreen from '../screen/user/address/EditUserAddressScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabTop = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

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

function TabsTopAccount() {
  return (
    <TabTop.Navigator>
      <TabTop.Screen name="boughtScreen" component={BoughtScreen}  />
      <TabTop.Screen name="postingScreen" component={PostingScreen} />
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
      <Tab.Screen name="Account" component={TabsTopAccount}  options={({ navigation, route }) => ({
          headerRight: () => (
            <ButtonOpacity onPress={() => navigation.navigate('UserAddressScreen')}>
              <Ionicons name='settings-outline' size={30} color={Colors.white} />
            </ButtonOpacity>
          ),
        })} />
    </Tab.Navigator>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="ProductsScreenFunction" component={ProductsScreenFunction} />
    </Drawer.Navigator>
  );
}

function ProductsScreenFunction(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProduckScreen" component={UserProduckScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const AuthContext = React.createContext()
const SignInNavigate = ({navigation}) => {
  const { signIn } = React.useContext(AuthContext);
  return <SignInScreen  signIn={signIn} navigation={navigation} />
}
const SignUpNavigate = ({navigation}) => {
  const { signUp } = React.useContext(AuthContext);
  return <SignUpScreen  signUp={signUp} navigation={navigation} />
}
const RESTORE_TOKEN = 'RESTORE_TOKEN'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
export default function App() {
  const [state,dispatch] = React.useReducer((prevState,action) => {
    switch(action.type){
      case RESTORE_TOKEN:
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          userId: action.userId
        };
      case SIGN_IN:
        return {
          ...prevState,
          isSignedIn: true,
          userToken: action.token,
          userId: action.userId
        };
      case SIGN_OUT:
        return {
          ...prevState,
          isSignedIn: false,
          userToken: null,
          userId:null
        };
      default:
        return prevState
    }
  },{
    isLoading: true,
    isSignedIn: false,
    userToken: null,
    userId:null
  })

  const authContext = React.useMemo(() => ({
    signIn: async (data) => {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDo4P7HUOCik9-nbveq_DdC5LqF8-nVpq4',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email:data.userEmail,
            password:data.userPassword,
            returnSecureToken:true
          })
        })
        if(!response.ok){
          throw new Error('Terjadi kesalahan pada login')
        }
        const resData = await response.json()
        await SecureStore.setItemAsync('token_demo', resData.idToken);
        await SecureStore.setItemAsync('user_demo', resData.localId);
        dispatch({ type: SIGN_IN, token: resData.idToken,userId: resData.localId });
      } catch (err) {
        throw err.message
      }
    },
    signOut: () => {
      SecureStore.deleteItemAsync('token_demo')
      dispatch({ type: SIGN_OUT })
    },
    signUp: async (data) => {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDo4P7HUOCik9-nbveq_DdC5LqF8-nVpq4',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email:data.userEmail,
            password:data.userPassword,
            returnSecureToken:true
          })
        })
        if(!response.ok){
          throw new Error('Terjadi kesalahan pada pendaftaran')
        }
        const resData = await response.json()
        await SecureStore.setItemAsync('token_demo', resData.idToken);
        await SecureStore.setItemAsync('user_demo', resData.localId);
        dispatch({ type: SIGN_IN, token: resData.idToken,userId: resData.localId });
      } catch (err) {
        throw err.message
      }
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `SecureStore`
      // In the example, we'll use a dummy token

    },
  }),[])
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !state.isSignedIn ? (
              <>
                <Stack.Screen name="Home" component={DrawerNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
                <Stack.Screen name="UserAddressScreen" component={UserAddressScreen} />
                <Stack.Screen name="EditUserAddressScreen" component={EditUserAddressScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="SignInScreen" component={SignInNavigate} options={{ headerShown: false }}  />
                <Stack.Screen name="SignUpScreen" component={SignUpNavigate} options={{ headerShown: false }}  />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
