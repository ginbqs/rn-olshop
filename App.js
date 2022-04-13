import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
// import {AppLoading} from 'expo'
// import * as Font from 'expo-font'
import bannersReducers from './store/reducers/banners'
import cartReducers from './store/reducers/cart'
import coinsReducers from './store/reducers/coins'
import ownersReducers from './store/reducers/owners'
import productsReducers from './store/reducers/products';
import shortcutsReducers from './store/reducers/shortcuts';
import ordersReducers from './store/reducers/order';
import usersReducres from './store/reducers/user';

import ShopNavigation from './navigation/ShopNavigation';
import { useState } from 'react';
import {init}  from './config/db';

const rootReducers = combineReducers({
  banners : bannersReducers,
  carts : cartReducers,
  orders : ordersReducers,
  coins : coinsReducers,
  owners: ownersReducers,
  products : productsReducers,
  shortcuts: shortcutsReducers,
  users: usersReducres
})
const store = createStore(rootReducers,applyMiddleware(ReduxThunk))

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'robot':require('./assets/fonts/Roboto-Regular.ttf'),
//   })
// }

init().then((res) => {
  console.log('initialized db')
}).catch(err => {
  console.log('initialized db failed')
  console.log(err)
})

export default function App() {
  const [fontLoaded,setFontLoaded] = useState(false)

  // if(!fontLoaded){
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => {
  //         setFontLoaded(true)
  //       }}
  //     />
  //   )
  // }
  return (
    <Provider store={store}>
      <ShopNavigation />
      {/* <StatusBar translucent={true} backgroundColor="black" /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
