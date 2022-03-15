
import * as React from 'react';
import { View,StyleSheet, ScrollView } from 'react-native';
import {useSelector} from 'react-redux'

import Colors from '../../constants/Colors';
import HeaderHome from '../../components/shop/HeaderHome';
import MyMoney from '../../components/shop/MyMoney';
import FlashSale from '../../components/shop/FlashSale';
import ProductHorizontal from '../../components/shop/ProductHorizontal';
import Shortcut from '../../components/shop/Shortcut';
import Banner from '../../components/shop/Banner';
import { HEADERS } from '../../data/dummy-data';

export default function HomeScreen({ navigation }) {
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
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <HeaderHome  navigation={navigation} data={HEADERS} onRedirectCart={onRedirectCart} />
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