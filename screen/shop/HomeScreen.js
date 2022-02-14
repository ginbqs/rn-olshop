
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
import { dataMyMoney,dataNotif,dataIcon,dataImage,dataFlashSale } from '../../data/dummy-data';

export default function HomeScreen({ navigation }) {
    const selectedFlashSale = useSelector(state => state.products.flashSale)
    const selectedBestProduct = useSelector(state => state.products.bestProduct)
    const onRedirectCart = () => {
        console.log('asusuuu')
        navigation.navigate('CartScreen')
    }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <HeaderHome  navigation={navigation} data={dataNotif} onRedirectCart={onRedirectCart} />
            </View>
            <View style={styles.main}>
                <MyMoney data={dataMyMoney} />
                <View style={styles.containerMain}>
                    <ScrollView>
                    <View style={styles.section}>
                        <Shortcut data={dataIcon} />
                    </View>
                    <View style={styles.section}>
                       <Banner data={dataImage} />
                    </View>
                    <View style={styles.section}>
                        <Shortcut data={dataIcon} />
                    </View>
                    <View style={styles.section}>
                        <FlashSale data={selectedFlashSale} />
                    </View>
                    <View style={styles.section}>
                        <ProductHorizontal  data={selectedBestProduct} type='terlaris' />
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