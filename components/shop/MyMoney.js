import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import  Colors  from '../../constants/Colors'
import {Label,SubLabel} from '../Font'
import { Currency } from '../../utils/Number'

const MyMoney = ({data}) => {
    return(
        <View style={styles.containerMoney}>
            <View style={styles.scan}>
                <Ionicons name="scan" size={50}  color={Colors.black} />
            </View>
            <View style={styles.money}>
                <View style={styles.subMoney}>
                    <Ionicons name="wallet-outline" size={20} color={Colors.primary500} />
                    <Label styleProps={styles.subMoneyText}>{Currency(data.money,'rp')}</Label>
                </View>
                <View>
                    <SubLabel styleProps={styles.moneyDesc}>Isi saldo VitaShop</SubLabel>
                </View>
            </View>
            <View style={styles.money}>
                <View style={styles.subMoney}>
                    <Ionicons name="card-outline" size={20} color={Colors.primary500} />
                    <Label styleProps={styles.subMoneyText}>{Currency(data.points)}</Label>
                </View>
                <View>
                    <SubLabel styleProps={styles.moneyDesc}> Klaim disini</SubLabel>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerMoney:{
        position:'absolute',
        width:Dimensions.get('window').width*0.9,
        top:'-2%',
        left:'5%',
        height:60,
        borderRadius:10,
        backgroundColor:Colors.background,
        shadowColor:Colors.black,
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        elevation:5,
        flexDirection:'row'
    },
    scan:{
        width:60,
        alignItems:'center',
        justifyContent:'center'
    },
    money:{
        flex:1,
        paddingLeft:10,
        justifyContent:'center'
    },
    subMoney:{
        flexDirection:'row'
    },
    subMoneyText:{
        marginTop:2,
        marginLeft:5
    },
    moneyDesc:{
        color:Colors.primary900
    },
})
export default MyMoney;
