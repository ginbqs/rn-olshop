import React, { useCallback, useEffect, useReducer,useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ButtonOpacity from '../../components/ButtonOpacity';
import { Label, SubLabel } from '../../components/Font';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';

import * as productsActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state,action) => {
  if(action.type===FORM_INPUT_UPDATE){
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
  }
  return state;
}

const EditProductScreen = ({route,navigation}) => {
  const { prodId } = route.params;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState()

  const dispatch = useDispatch();

  const submitHandler = async () => {
    if(!formState.formIsValid){
      Alert.alert("Warning","Please input the form!")
      return;
    }
    setError(null)
    setIsLoading(true)
    try {
      if(editedProduct){
        console.log('edit submitHandler')
        await dispatch(productsActions.editProdcut(prodId,formState.inputValues.title,formState.inputValues.imageUrl,formState.inputValues.description))
      }else{
        console.log('add submitHandler')
        await  dispatch(productsActions.addProdcut(formState.inputValues.title,formState.inputValues.imageUrl,formState.inputValues.price,formState.inputValues.description))
      }
      navigation.goBack()
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    if(error) Alert.alert('Error!',error)
  },[error])  
  const [formState, dispatchFormState] = useReducer(formReducer,{
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: editedProduct ? editedProduct.price : '',
      description: editedProduct ? editedProduct.description.detail : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  })
  const onInputChange = useCallback((inputIdentifier,text,isValid) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    })
  },[dispatchFormState])
  if(isLoading){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color={Colors.primary500} />
    </View>
  }
  return (
    <ScrollView>
      <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText="Please enter a valid title!"
            initialValue={editedProduct ? editedProduct.title : ''}
            initialValidate={!!editedProduct}
            onChangeText={onInputChange}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            required
          />
          <Input
            id='imageUrl'
            label='Image URL'
            errorText="Please enter a valid Image URL!"
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialValidate={!!editedProduct}
            onChangeText={onInputChange}
            keyboardType='default'
            returnKeyType='next'
            required
          />
        {editedProduct ? null : (
          <Input
            id='price'
            label='Price'
            errorText="Please enter a valid Price!"
            initialValue={editedProduct ? editedProduct.price : ''}
            initialValidate={!!editedProduct}
            onChangeText={onInputChange}
            keyboardType='decimal-pad'
            returnKeyType='next'
            required
            min={0.1}
          />
        )}
        <Input
            id='description'
            label='Description'
            errorText="Please enter a valid Description!"
            initialValue={editedProduct ? editedProduct.description.detail : ''}
            initialValidate={!!editedProduct}
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
      </View>
      <View style={{marginHorizontal:20,flexDirection:'row',justifyContent:'space-between'}}>
        <ButtonOpacity variant='secondary' onPress={() => navigation.goBack()}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Label>Kembali</Label>
          </View>
        </ButtonOpacity>
        <ButtonOpacity variant='primary' onPress={() => submitHandler()}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Label>Simpan</Label>
          </View>
        </ButtonOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default EditProductScreen;
