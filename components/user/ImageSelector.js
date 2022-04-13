import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Image,Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import Colors from '../../constants/Colors'
import ButtonOpacity from '../ButtonOpacity'
import { Label } from '../Font'


const ImageSelector = ({handleImage}) =>{
    const [pickedImage, setPickedImage] = useState()
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
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
        const hasPermission = await verifyPermission()
        if(!hasPermission){
            return false;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        });
        setPickedImage(image.uri)
        handleImage(image.uri)
    }
    return (
        <View style={styles.iamgePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Label>No image picker yet</Label>
                ): (
                    <Image style={styles.image} source={{uri:pickedImage}}/>
                )}
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

export default ImageSelector