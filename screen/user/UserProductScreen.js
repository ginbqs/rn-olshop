import {useCallback, useState} from 'react'
import { StyleSheet, FlatList, View,Alert,ActivityIndicator } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'

import ButtonOpacity from '../../components/ButtonOpacity';
import { Label, SubHeading, Title } from '../../components/Font';
import ProductItem from '../../components/user/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products'
import { useEffect } from 'react';

export default function UserProductScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const loadProducts = useCallback(async() => {
    setError(null)
    setIsLoading(true)
    setIsRefreshing(true)
    try {
      await dispatch(productsActions.fetchProduct())
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
    setIsRefreshing(false)
  },[loadProducts,setIsLoading,setError])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProducts()
    });
    return unsubscribe
  },[loadProducts])

  const userProducts = useSelector(state => state.products.userProducts)
  const deleteHandler = (prodId) => {
    Alert.alert('Hapus Data','Yakin data ini akan dihapus?',[
      {text:'Tidak',style:'default'},
      {
        text:'Hapus',
        style:'destructive',
        onPress:() => {
          dispatch(productsActions.deleteProduct(prodId))
        }
      }
    ])
  }
  const editProductHandler = (prodId) => {
    navigation.navigate('EditProductScreen',{
      prodId : prodId
    })
  }
  const buttonAdd = <View style={{marginHorizontal:20}}>
        <ButtonOpacity variant='primary' onPress={() => editProductHandler('')}>
          <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Ionicons name='add-circle-outline' size={20} />
            <SubHeading>Tambah</SubHeading>
          </View>
        </ButtonOpacity>
      </View>
  if(error){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Label>An error occurred!</Label>
      <ButtonOpacity onPress={loadProducts}>
        <Title styleProps={{color:Colors.danger400}}>Try again</Title>
      </ButtonOpacity>
    </View>
  }
  
  if(isLoading && userProducts.length === 0){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {buttonAdd}
      <Label>Data Produk Kosong</Label>
    </View>
  }
  if(isLoading){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color={Colors.primary500} />
    </View>
  }
  return (
    <View style={styles.container}>
      {buttonAdd}
      <FlatList 
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        keyExtractor={item => item.id}
        data={userProducts}
        renderItem={itemData => 
          <ProductItem 
            data={itemData}
            onViewDetail={() => editProductHandler(itemData.item.id)}
          >
             <ButtonOpacity
                variant='primary'
                outline
                onPress={() => {
                  editProductHandler(itemData.item.id);
                }}
              >
                <Label>Edit</Label>
              </ButtonOpacity>
              <ButtonOpacity
                variant='danger'
                outline
                onPress={deleteHandler.bind(this, itemData.item.id)}
              >
                <Label>Delete</Label>
              </ButtonOpacity>
          </ProductItem>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
