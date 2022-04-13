import React,{ useCallback,useEffect, useState } from 'react';
import { View,StyleSheet,Image,ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'

import Card from '../../../components/Card';
import { Label,SubLabel,Title } from '../../../components/Font';
import Colors from '../../../constants/Colors';
import { Currency } from '../../../utils/Number';
import ButtonOpacity from '../../../components/ButtonOpacity';
import * as orderActions from '../../../store/actions/order'


export default function BoughtScreen({navigation}) {
    const selectedOrders = useSelector(state => state.orders)
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch()
    const loadOrders = useCallback(async() => {
        setError(null)
        setIsLoading(true)
        try {
          await dispatch(orderActions.fetchOrder())
        } catch (err) {
          setError(err.message)
        }
        setIsLoading(false)
     },[loadOrders,setIsLoading,setError])
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadOrders()
        });
        return unsubscribe
    },[loadOrders])
    if(error){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Label>An error occurred!</Label>
          <SubLabel>{error}</SubLabel>
          <ButtonOpacity onPress={loadOrders}>
            <Title styleProps={{color:Colors.danger400}}>Try again</Title>
          </ButtonOpacity>
        </View>
      }
      
      if(!isLoading && selectedOrders.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Label>Data Produk Kosong</Label>
        </View>
      }
      if(isLoading){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size='large' color={Colors.primary500} />
        </View>
      }
    return (
      <View style={{ flex: 1}}>
        <Card>
        {
            selectedOrders && selectedOrders.orders.map(function(val,id){
                const date = new Date(val.date)
                const image = val.items && val.items[0] && val.items[0].imageUrl
                const prodTitle = val.items && val.items[0] && val.items[0].prodTitle
                return(
                    <View style={styles.container} key={id}>
                        <View style={styles.containerTitle}>
                            <Ionicons name='briefcase-outline' size={30} />
                            <View style={{marginLeft:10}}>
                                <SubLabel>Belanja</SubLabel>
                                <SubLabel>{date.toDateString()}</SubLabel>
                            </View>
                        </View>
                        <View style={styles.containerBody}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{}}><Image source={{uri:image}} style={{width:35,height:40,borderRadius:4}} /></View>
                                <View style={{marginLeft:10}}>
                                    <Label>{prodTitle}</Label>
                                    <SubLabel>{Object.keys(val.items).length} Barang</SubLabel>
                                </View>
                            </View>
                            <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
                                <View>
                                    <Label>Total Belanja</Label>
                                    <Title>{Currency(val.totalAmount,'rp')}</Title>
                                </View>
                                <View>
                                    <ButtonOpacity  variant='primary'>
                                        <Label>Detail</Label>
                                    </ButtonOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })
        }
        </Card>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container:{
        margin:10,
        borderWidth:1,
        borderColor:Colors.gray,
        borderRadius:7        
    },
    containerTitle:{
        flexDirection:'row',
        margin:10,
        borderBottomWidth:1,
        borderColor:Colors.gray
    },
    containerBody:{
        margin:10,
    }

  })