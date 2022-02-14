import React from 'react'
import { StyleSheet, Text, View,FlatList,Image } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'

import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors';

export default function ProductOverViewScreen(props) {
  const products = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={itemData => <ProductItem data={itemData} onViewDetail={() =>{
          props.navigation.navigate('ProductDetailScreen',{
            prodId : itemData.item.id
          })
        }}
        onAddToCart={() => {
          dispatch(addToCart(itemData.item))
        }} 
        />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: Colors.background,
  },
});
