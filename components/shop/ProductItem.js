import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import  Colors  from '../../constants/Colors'
import { Currency } from '../../utils/Number'
import { Label,TextLittle, SubHeading } from '../Font'
import ButtonOpacity from '../ButtonOpacity'

const ProductItem = ({onViewDetail,onAddToCart,data}) => {
    const price = data.item.price - (data.item.price/100*data.item.discount)
    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <ButtonOpacity onPress={onViewDetail}>
                    <View style={styles.product}>
                    <View style={styles.image}>
                        <Image source={{uri:data.item.imageUrl}} style={{height:'100%', width:'100%',borderTopRightRadius:10,borderTopLeftRadius:10}} />
                        <View style={styles.backgroundCart}>
                        </View>
                        <View style={styles.cart}>
                            <ButtonOpacity onPress={onAddToCart}><Ionicons name='ios-cart-outline' color={Colors.primary500} size={30} /></ButtonOpacity>
                        </View>
                    </View>
                    <View style={styles.containerTitle}>
                        <Label styleProps={{marginTop:10}}>{data.item.title}</Label>
                    </View>
                    <View style={styles.containerTitle}>
                        <SubHeading styleProps={{marginTop:5}}>{Currency(price,'rp')}</SubHeading>
                    </View>
                    <View style={styles.containerTitle}>
                        <View style={styles.containerDiscount}>
                            <TextLittle styleProps={styles.discount}>{data.item.discount}%</TextLittle>
                        </View>
                        <View  style={styles.containerOriginPrice}>
                            <TextLittle styleProps={styles.price}>{Currency(data.item.price,'rp')}</TextLittle>
                        </View>
                    </View>
                    <View style={styles.containerTitle}>
                        <View style={{marginTop:3}}>
                            <Ionicons name="map-outline" color={Colors.info500}  />
                        </View>
                        <View  style={{marginLeft:5}}>
                            <Label> {data.item.address}</Label>
                        </View>
                    </View>
                    <View style={styles.containerTitle}>
                        <View style={{marginTop:3}}>
                            <Ionicons name="star" color='orange' />
                        </View>
                        <View  style={{marginLeft:5,marginTop:3}}>
                            <Label> {data.item.rating}</Label>
                        </View>
                        <View  style={{marginLeft:5,marginTop:3}}>
                            <Label>|</Label>
                        </View>
                        <View  style={{marginLeft:5,marginTop:3}}>
                            <Label>Terjual {data.item.sale}</Label>
                        </View>
                    </View>
                    {
                        data.item.freeShipping && (
                            <View style={styles.containerButton}>
                                <ButtonOpacity><Image source={{uri:'https://freepikpsd.com/file/2019/10/gratis-ongkir-png-5-Transparent-Images.png'}} style={{height:50,width:50}} /></ButtonOpacity>
                            </View>
                        )
                    }
                    </View>
                </ButtonOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    card:{
        height:330,
        marginVertical:10,
        marginHorizontal:10
    },
    product:{
        backgroundColor:Colors.background,
        shadowColor:Colors.black,
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        elevation:5,
        borderWidth:1,
        borderColor:Colors.gray,
        borderRadius:10,
        height:'100%'
    },
    image:{
        position:'relative',
        height:150,
    },
    backgroundCart:{
        position:'absolute',
        height:40,
        width:40,
        top:2,
        right:7,
        padding:5,
        borderRadius:8,
        opacity:0.7,
        backgroundColor:Colors.gray
    },
    cart:{
        position:'absolute',
        top:2,
        right:7,
        padding:5,
    },
    containerTitle:{
        marginHorizontal:10,
        flexDirection:'row'
    },
    containerButton:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
    },
    containerDiscount:{
        backgroundColor:Colors.danger100,
        padding:3,
        borderRadius:3,
        marginVertical:5
    },
    containerOriginPrice:{
        
    },
    price:{
        color:Colors.black,
        marginVertical:5,
        paddingHorizontal:10,
        paddingVertical:2,
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    }
})
export default ProductItem;