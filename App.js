import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
// import {AppLoading} from 'expo'
// import * as Font from 'expo-font'
import productsReducres from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import ShopNavigation from './navigation/ShopNavigation';
import { useState } from 'react';

const rootReducers = combineReducers({
  products : productsReducres,
  carts : cartReducer
})
const store = createStore(rootReducers)

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'robot':require('./assets/fonts/Roboto-Regular.ttf'),
//   })
// }

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
