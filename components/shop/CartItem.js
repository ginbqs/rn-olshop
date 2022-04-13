import {View,StyleSheet,Image} from 'react-native'
import {useDispatch} from 'react-redux'
import CheckBox from "expo-checkbox";
import {Ionicons} from '@expo/vector-icons'

import {deleteFromCart,substractedToCart,addedToCart} from '../../store/actions/cart'
import Card from '../Card';
import { Label, Title,SubLabel } from '../Font';
import { Currency } from '../../utils/Number';
import Colors from '../../constants/Colors';
import ButtonOpacity from '../ButtonOpacity';

const CartItem = ({data,ownerData,productData,handleCheckedProdCart,cartOwnerSelected,handleCheckedOwnerCart}) => {
    const dispatch = useDispatch()
    return(
        <Card stylesProps={{marginBottom:10,padding:10,flexDirection:'column'}}>
            <View style={styles.containerOwner}>
                <CheckBox
                value={cartOwnerSelected.includes(data.item)}
                onValueChange={() =>{
                    handleCheckedOwnerCart(data.item)
                }}
                style={styles.checkbox}
                />
                <View>
                    <View style={styles.containerOwner}>
                        <View style={{marginLeft:10}}>
                            <View style={{}}><Image source={{uri:ownerData[data.item].ownerLogo}} style={{width:32,height:32,borderRadius:50}} /></View>
                        </View>
                        <View style={{paddingLeft:10}}>
                            <Title>{ownerData[data.item].ownerName}</Title>
                            <SubLabel>{ownerData[data.item].address}</SubLabel>
                        </View>
                    </View>
                </View>
            </View>
            <View >
                {
                    Object.entries(productData[data.item]).map(([key, value]) => {
                        return(
                            <View style={{marginTop:15}} key={`${key}-${value.ownerId}`}>
                                <View style={styles.containerOwner}>
                                    <CheckBox
                                        value={value.isChecked}
                                        onValueChange={() => {
                                            handleCheckedProdCart(key,!value.isChecked)
                                        }}
                                    />
                                    <View>
                                        <View style={styles.containerOwner}>
                                            <View style={{marginLeft:10}}>
                                                <View style={{}}><Image source={{uri:value.imageUrl}} style={{width:55,height:60,borderRadius:4}} /></View>
                                            </View>
                                            <View style={{paddingLeft:10}}>
                                                <Label>{value.prodTitle}</Label>
                                                <Title>{Currency(value.productPrice,'rp')}</Title>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.containerOwner}>
                                    {
                                        value.note && value.note!='' ? (
                                            <View>
                                                <Label>{value.note}</Label>
                                                <Label>Ubah</Label>
                                            </View>
                                        ) : (
                                            <View>
                                                <Label>{value.note}</Label>
                                                <Label styleProps={{color:Colors.primary500}}>Tulis Catatan</Label>
                                            </View>
                                        )
                                    }
                                </View>
                                <View style={{...styles.containerOwner,justifyContent:'flex-end',marginHorizontal:10,marginVertical:5}}>
                                    <View style={{marginHorizontal:10}}>
                                        <Ionicons name='trash' size={20} color={Colors.danger300} onPress={() => dispatch(deleteFromCart(key))} />
                                    </View>
                                    <View style={styles.containerInput}>
                                        <View>
                                            <ButtonOpacity onPress={() => dispatch(substractedToCart(key))}>
                                            <Title styleProps={{marginHorizontal:15,color:value.quantity > 1 ? Colors.primary500 : Colors.primary100}}>-</Title>
                                            </ButtonOpacity>
                                        </View>
                                        <View>
                                            <Label>{value.quantity}</Label>
                                        </View>
                                        <View>
                                            <ButtonOpacity onPress={() => dispatch(addedToCart(key))}>
                                            <Title styleProps={{marginHorizontal:15,color:Colors.primary500}}>+</Title>
                                            </ButtonOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        marginTop:7
    
    },
    containerOwner:{
        flexDirection:'row',
    },
    containerInput:{
        flexDirection:'row',
        borderColor:Colors.gray,
        borderWidth:1,
        borderRadius:5,
        padding:2
    }
});
export default CartItem;