import React, { useState,useCallback,useEffect } from "react";
import { StyleSheet, View,ActivityIndicator } from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'

import ButtonOpacity from '../../../components/ButtonOpacity';
import Card from '../../../components/Card';
import { Label,Title,SubHeading } from '../../../components/Font';
import Colors from '../../../constants/Colors';
import * as usersAction from '../../../store/actions/user'

export default function UserAddressScreen({navigation}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const loadUsersAdress = useCallback(async() => {
        setError(null)
        setIsLoading(true)
        setIsRefreshing(true)
        try {
            await dispatch(usersAction.fetchUserAddressSql())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
        setIsRefreshing(false)
    },[loadUsersAdress,setIsLoading,setError])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        loadUsersAdress()
        });
        return unsubscribe
    },[loadUsersAdress])

  

    useEffect(() => {
        setIsLoading(true);
        loadUsersAdress().then(() => {
          setIsLoading(false);
        });
      }, [dispatch, loadUsersAdress]);


    const selectedAddress = useSelector(state => state.users.address)
    const deleteHandler = (addressId) => {
        Alert.alert('Hapus Data','Yakin data ini akan dihapus?',[
        {text:'Tidak',style:'default'},
        {
            text:'Hapus',
            style:'destructive',
            onPress:() => {
            dispatch(usersAction.deleteAddress(addressId))
            }
        }
        ])
    }
    const editAddressHandler = (addressId) => {
        navigation.navigate('EditUserAdresscreen',{
        addressId : addressId
        })
    }
    const buttonAdd = <View style={{marginHorizontal:20}}>
            <ButtonOpacity variant='primary' onPress={() => editAddressHandler('')}>
            <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <Ionicons name='add-circle-outline' size={20} />
                <SubHeading>Tambah</SubHeading>
            </View>
            </ButtonOpacity>
        </View>
    if(error){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Label>An error occurred!</Label>
        <ButtonOpacity onPress={loadUsersAdress}>
            <Title styleProps={{color:Colors.danger400}}>Try again</Title>
        </ButtonOpacity>
        </View>
    }
    
    if(isLoading && selectedAddress.length === 0){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        {buttonAdd}
        <Label>Data Alamat Kosong</Label>
        </View>
    }
    if(isLoading){
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' color={Colors.primary500} />
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={{margin:10}}>
                <ButtonOpacity variant='primary' onPress={() => navigation.navigate('EditUserAddressScreen')}>
                    <Label styleProps={{textAlign:'center'}}>Tambah</Label>
                </ButtonOpacity>
            </View>
            {
                selectedAddress && selectedAddress.length > 0 && selectedAddress.map(function(val,idx){
                    return(
                        <Card stylesProps={{height:100,padding:10,marginVertical:5}} key={idx}>
                            <View style={{flexDirection:'row'}}>
                                <Title>{val.name}</Title>
                                <Label styleProps={{color:Colors.danger400,marginLeft:10}}>{val.primary_address ? '[ Utama ]' : ''}</Label>
                            </View>
                            <View>
                                <Label>{val.tlp}</Label>
                            </View>
                            <View>
                                <Label>{val.address}</Label>
                            </View>
                        </Card>
                    )
                })
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAddress:{
        height:100,
        borderRadius:10,
        borderWidth:1,
        borderColor:Colors.gray,
        padding:10,
        marginVertical:5,
    }
});
