import React, { useEffect, useReducer } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Label, SubLabel } from './Font';
import Colors from '../constants/Colors';


const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state,action) => {
    switch(action.type){
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched:true
            }
        default:
            return state
    }
}

export default Input = props => {
    const [inputState,dispatch] = useReducer(inputReducer,{
        value: props.initialValue,
        isValid: props.initialValidate,
        touched: false
    })
    const textChangeHandler = (text) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
          isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
          isValid = false;
        }
        if (props.min != null && +text < props.min) {
          isValid = false;
        }
        if (props.max != null && +text > props.max) {
          isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
          isValid = false;
        }
       
        dispatch({
            type:INPUT_CHANGE,
            value: text,
            isValid: isValid
        })
    }
    const handleBlur = () => {
        dispatch({
            type:INPUT_BLUR
        })
    }
    const {onChangeText,id} = props
    useEffect(() => {
        if(inputState.touched){
            onChangeText(id,inputState.value,inputState.isValid)
        }
    },[inputState,onChangeText,id])
    return (
        <View style={styles.formControl}>
            <Label styleProps={styles.label}>{props.label}</Label>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={handleBlur}
                // onEndEditing={() => console.log('onEndEditing')}
                // onSubmitEditing={() => console.log('onSubmitEditing')}
            />
            {!inputState.isValid && inputState.touched && <SubLabel styleProps={{color:Colors.danger500}}>{props.errorText}</SubLabel>}
        </View>
    )
}

const styles = StyleSheet.create({
    
    formControl: {
      width: '100%'
    },
    label: {
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
    //   paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    }
});