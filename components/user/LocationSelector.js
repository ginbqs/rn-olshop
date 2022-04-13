import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Image,Alert,ActivityIndicator} from 'react-native'
import * as LocationPicker from 'expo-location'

import Colors from '../../constants/Colors'
import ButtonOpacity from '../ButtonOpacity'
import { Label } from '../Font'


const LocationSelector = ({handleLocation}) =>{
    const [pickedLocation, setPickedLocation] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const [status, requestPermission] = LocationPicker.useForegroundPermissions();
    const verifyPermission = async() => {
        if(!await status.granted){
            Alert.alert('insufficient permission!','you need to grat camera permission to use this app',[{text:'ASK PERMISSION',onPress:() =>{
                requestPermission()
            }},{text:'OK Cancel'}])
            return false;
        }
        return true;
    }
    const takeImageHandler = async() =>{
        await setIsFetching(true)
        const hasPermission = await verifyPermission()
        if(!hasPermission){
            return false;
        }
        try {
            const locations = await LocationPicker.getCurrentPositionAsync({timeout:5000})
            console.log(locations)
            setPickedLocation({
                lat:locations.coords.latitude,
                long:locations.coords.longitude,
            })
            // handleLocation(image.uri)
        } catch (err) {
            Alert.alert('location error','Please try again or pick a location on the map',[{text:'OK'}])            
        }
        await setIsFetching(false)
    }
    return (
        <View style={styles.iamgePicker}>
            <View style={styles.imagePreview}>
                {isFetching ? (
                   <ActivityIndicator size={30} color={Colors.primary300}/>
                ): null}
            </View>
            <ButtonOpacity variant='primary' onPress={takeImageHandler}>
                <Label>Take Image</Label>
            </ButtonOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    iamgePicker:{
        alignItems:'center'
    },
    imagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:Colors.gray,
        borderWidth:1
    },
    image:{
        width:'100%',
        height:'100%',
    },
})

export default LocationSelector