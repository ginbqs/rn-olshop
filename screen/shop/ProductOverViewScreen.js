import React from 'react'
import { StyleSheet, View,FlatList } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../../store/actions/cart'

import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors';
import ButtonOpacity from '../../components/ButtonOpacity';
import { Label } from '../../components/Font';

export default function ProductOverViewScreen(props) {
  let products = useSelector(state => state.products.bestProduct)
  const selectedOwners = useSelector(state => state.owners.owners)
  const tempProducts = []
  products.map(function(val,i){
    let selectedOwner = selectedOwners && selectedOwners.find(owner => val.ownerId === owner.id)
    tempProducts.push({...val,...{
      ownerName:selectedOwner.ownerName,
      ownerLogo:selectedOwner.ownerLogo,
      address:selectedOwner.address,
    }})
  })
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <FlatList 
        data={tempProducts}
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
