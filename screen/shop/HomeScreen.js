
import React,{ useCallback,useEffect, useState } from 'react';
import { View,StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'

import Colors from '../../constants/Colors';
import HeaderHome from '../../components/shop/HeaderHome';
import MyMoney from '../../components/shop/MyMoney';
import FlashSale from '../../components/shop/FlashSale';
import ProductHorizontal from '../../components/shop/ProductHorizontal';
import Shortcut from '../../components/shop/Shortcut';
import Banner from '../../components/shop/Banner';
import { HEADERS } from '../../data/dummy-data';
import { Label,SubLabel,Title } from '../../components/Font';
import ButtonOpacity from '../../components/ButtonOpacity';
import * as productsActions from '../../store/actions/products'

export default function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch()
    const loadProducts = useCallback(async() => {
        console.log('loadProducts')
        setError(null)
        setIsLoading(true)
        try {
          await dispatch(productsActions.fetchProduct())
        } catch (err) {
          setError(err.message)
        }
        setIsLoading(false)
     },[loadProducts,setIsLoading,setError])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadProducts()
        });
        return unsubscribe
    },[loadProducts])
    const selectedFlashSale = useSelector(state => state.products.flashSale)
    const selectedBestProduct = useSelector(state => state.products.bestProduct)
    const selectedOwners = useSelector(state => state.owners.owners)
    const selectedCoins = useSelector(state => state.coins)
    const selectedIcons = useSelector(state => state.shortcuts.shortcuts)
    const selectedBanners = useSelector(state => state.banners.banners)
    
    // console.log(selectedOwners)
    const onRedirectCart = () => {
        navigation.navigate('CartScreen')
    }
    const openDrawer = () => {
        navigation.openDrawer();
    }
    if(error){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Label>An error occurred!</Label>
          <SubLabel>{error}</SubLabel>
          <ButtonOpacity onPress={loadProducts}>
            <Title styleProps={{color:Colors.danger400}}>Try again</Title>
          </ButtonOpacity>
        </View>
      }
      
      if(!isLoading && selectedBestProduct.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ButtonOpacity onPress={openDrawer}>
                <Label>Admin</Label>
            </ButtonOpacity>
          <Label>Data Produk Kosong</Label>
        </View>
      }
      if(isLoading){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size='large' color={Colors.primary500} />
        </View>
      }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <HeaderHome  navigation={navigation} data={HEADERS} onRedirectCart={onRedirectCart} openDrawer={openDrawer} />
            </View>
            <View style={styles.main}>
                <MyMoney data={selectedCoins} />
                <View style={styles.containerMain}>
                    <ScrollView>
                    <View style={styles.section}>
                        <Shortcut data={selectedIcons} />
                    </View>
                    <View style={styles.section}>
                       <Banner data={selectedBanners} />
                    </View>
                    <View style={styles.section}>
                        <Shortcut data={selectedIcons} />
                    </View>
                    <View style={styles.section}>
                        <FlashSale data={selectedFlashSale} navigation={navigation} />
                    </View>
                    <View style={styles.section}>
                        <ProductHorizontal  data={selectedBestProduct} owners={selectedOwners}  navigation={navigation} type='terlaris' />
                    </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        position:'relative',
        flex:1,
    },
    header:{
        height:'25%',
    },
    main:{
        flex:1,
        backgroundColor:Colors.background
    },
    
    containerMain:{
        marginTop:50,
        flex:1,
        backgroundColor:Colors.background
    },
    section:{

    }


})