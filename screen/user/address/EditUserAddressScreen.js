import React, { useReducer,useCallback } from "react";
import { StyleSheet, Switch, View ,Alert,ScrollView} from 'react-native';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'

import ButtonOpacity from '../../../components/ButtonOpacity';
import Card from '../../../components/Card';
import { Label } from '../../../components/Font';
import Input from '../../../components/Input';
import ImageSelector from "../../../components/user/ImageSelector";
import LocationSelector from "../../../components/user/LocationSelector";
import Colors from '../../../constants/Colors';
import * as usersAction from '../../../store/actions/user'
// kotak
// namalengkap
// nomor tlp

//alamat
// provinsi
// deskripsi jl

// tandai sebagai kantor rumah
// atur sebagai alamat utama true false
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state,action) => {
    switch(action.type){
        case FORM_INPUT_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]:action.value
            }
        
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]:action.isValid
            }
        
            let formIsValid = true;
            for(const key in updatedValidities){
                formIsValid = formIsValid && updatedValidities[key]
            }
            return{
                ...state,
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                formIsValid: formIsValid
            }
        default:
            return state;
    }
}
export default function EditUserAddressScreen({navigation,addressId}) {
    const dispatch = useDispatch()
    const editedAddress = useSelector(state => state.users.address.find(res => res.id === addressId))
    const onInputChange = useCallback((inputIdentifier,text,isValid) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: text,
          isValid: isValid,
          input: inputIdentifier
        })
      },[dispatchFormState])
    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues: {
            name: editedAddress ? editedAddress.name : '',
            tlp: editedAddress ? editedAddress.tlp : '',
            address: editedAddress ? editedAddress.address : '',
            mark_as: editedAddress ? editedAddress.mark_as : '',
            primary_address: editedAddress ? editedAddress.primary_address : false,
            image: editedAddress ? editedAddress.image : false,
            lat: editedAddress ? editedAddress.lat : '',
            lang: editedAddress ? editedAddress.lang : '',
        },
        inputValidities: {
            name: editedAddress ? true : false,
            tlp: editedAddress ? true : false,
            address: editedAddress ? true : false,
            mark_as: editedAddress ? true : false,
            primary_address: editedAddress ? true : false,
            image: editedAddress ? true : false,
            lat: editedAddress ? true : false,
            lang: editedAddress ? true : false
        },
        formIsValid: editedAddress ? true : false
    })
    const submitHandler = async () => {
        if(!formState.formIsValid){
          Alert.alert("Warning","Please input the form!")
          return;
        }
        try {
          if(editedAddress){
            
            console.log('edit submitHandler')
            // name,tlp,address,mark_as,primary_address
            await dispatch(usersAction.editedAddress(addressId,formState.inputValues.name,formState.inputValues.tlp,formState.inputValues.address,formState.inputValues.mark_as,formState.inputValues.primary_address,formState.inputValues.image,formState.inputValues.lat,formState.inputValues.lang))
          }else{
            console.log('add submitHandler')
            await dispatch(usersAction.addUserAddressSql(formState.inputValues.name,formState.inputValues.tlp,formState.inputValues.address,formState.inputValues.mark_as,formState.inputValues.primary_address,formState.inputValues.image,formState.inputValues.lat,formState.inputValues.lang))
          }
          navigation.goBack()
        } catch (err) {
            Alert.alert("Warning",err.message)
            return;
        }
      }
    const handleImage = (uri) => {
        onInputChange('image',uri,true)
    }
    return (
        <ScrollView>
        <View style={styles.container}>
            <Card stylesProps={{padding:10,marginVertical:5}}>
            <Input
                id='name'
                label='Name'
                errorText="Please enter a valid name!"
                initialValue={editedAddress ? editedAddress.name : ''}
                initialValidate={!!editedAddress}
                onChangeText={onInputChange}
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                required
            />
            <Input
                id='tlp'
                label='Telepon'
                errorText="Please enter a valid telepon!"
                initialValue={editedAddress ? editedAddress.tlp : ''}
                initialValidate={!!editedAddress}
                onChangeText={onInputChange}
                keyboardType='decimal-pad'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                required
            />
            <Input
                id='address'
                label='Address'
                errorText="Please enter a valid Address!"
                initialValue={editedAddress ? editedAddress.address : ''}
                initialValidate={!!editedAddress}
                onChangeText={onInputChange}
                keyboardType='default'
                autoCapitalize='sentences'
                multiline
                numberOfLines={3}
                autoCorrect
                returnKeyType='next'
                required
                minLength={5}
            />
            <ImageSelector  handleImage={handleImage}/>
            <LocationSelector handleLocation={handleImage}/>
            <View style={{marginTop:10}}>
                <Label>Mark As</Label>
                <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-end'}}>
                    <ButtonOpacity onPress={() => {
                            onInputChange('mark_as','house',true)
                        }}>
                        <View style={{borderRadius:4,borderWidth:1,padding:5,marginHorizontal:4,backgroundColor:(formState.inputValues.mark_as=='house' ? Colors.primary100 : Colors.white),borderColor:(formState.inputValues.mark_as=='house' ? Colors.primary100 : Colors.gray)}}>
                            <Label>House</Label>
                        </View>
                    </ButtonOpacity>
                    <ButtonOpacity  onPress={() => {
                            onInputChange('mark_as','office',true)
                        }}>
                        <View style={{borderRadius:4,borderWidth:1,padding:5,marginHorizontal:4,backgroundColor:(formState.inputValues.mark_as=='office' ? Colors.primary100 : Colors.white),borderColor:(formState.inputValues.mark_as=='office' ? Colors.primary100 : Colors.gray)}}>
                            <Label>Office</Label>
                        </View>
                    </ButtonOpacity>
                </View>
            </View>
            <View style={{marginTop:10}}>
                <Label>Set As Primary Address</Label>
                <View style={{marginTop:10,flexDirection:'row',justifyContent:'flex-end'}}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={formState.inputValues.primary_address ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(val => {
                            onInputChange('primary_address',!formState.inputValues.primary_address,true)
                        })}
                        value={formState.inputValues.primary_address}
                    />
                </View>
            </View>
            <Input
                id='lat'
                label='Latiitude'
                errorText="Please enter a valid Latiitude!"
                initialValue={editedAddress ? editedAddress.lat : ''}
                initialValidate={!!editedAddress}
                onChangeText={onInputChange}
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                required
            />
            <Input
                id='lang'
                label='Longitude'
                errorText="Please enter a valid Longitude!"
                initialValue={editedAddress ? editedAddress.name : ''}
                initialValidate={!!editedAddress}
                onChangeText={onInputChange}
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                required
            />
            </Card>
            <View style={{margin:10}}>
                <ButtonOpacity variant='primary' onPress={() => submitHandler()}>
                    <Label styleProps={{textAlign:'center'}}>Tambah</Label>
                </ButtonOpacity>
            </View>
        </View>
        </ScrollView>
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
