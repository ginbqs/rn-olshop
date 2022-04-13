import {useEffect, useState} from 'react'
import { StyleSheet, View,FlatList,Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import CheckBox from "expo-checkbox";
import {Ionicons} from '@expo/vector-icons'

import {updateCheckedProduct} from '../../store/actions/cart'
import {addOrder} from '../../store/actions/order'
import { Heading, Label,Title } from '../../components/Font';
import Colors from '../../constants/Colors';
import ButtonOpacity from '../../components/ButtonOpacity';
import { Currency } from '../../utils/Number';
import CartItem from '../../components/shop/CartItem';
import { ActivityIndicator } from 'react-native-web';

export default function CartScreen() {
  const selectedCart = useSelector(state => state.carts)
  const dispatch = useDispatch()
  let ownerId = ''
  let tempCart = {}
  let tempCartOwner = []
  let tempOwnerId = []
  for (const key in selectedCart.items) {
    ownerId =  selectedCart.items[key].ownerId
    if(!tempOwnerId.includes(ownerId)) tempOwnerId.push(ownerId)
    tempCartOwner = {...tempCartOwner,[ownerId]:{
      ownerName : selectedCart.items[key].ownerName,
      address : selectedCart.items[key].address,
      ownerLogo : selectedCart.items[key].ownerLogo
    }}
    tempCart[ownerId] =  {...tempCart[ownerId],[key]:selectedCart.items[key]}
  }
  const [selectedAllCart, setSelectedAllCart] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [cartOwnerSelected,setOwnerCartSelected] = useState([])
 
  const handleCheckedProdCart = (prodId,isChecked) => {
    dispatch(updateCheckedProduct(prodId,isChecked))
  }
  const handleCheckedOwnerCart = ownerId => {
    if(cartOwnerSelected.includes(ownerId)){
      const selectedOwner = cartOwnerSelected.filter(val => val!=ownerId)
      setOwnerCartSelected(selectedOwner)
      for(var key in selectedCart.items){
        if(selectedCart.items[key].ownerId===ownerId){
          dispatch(updateCheckedProduct(key,false))
        }
      }
    }else{
      setOwnerCartSelected(prev => [...prev,ownerId])
      for(var key in selectedCart.items){
        if(selectedCart.items[key].ownerId===ownerId){
          dispatch(updateCheckedProduct(key,true))
        }
      }
    }
  }
  const handleCheckedAllProduct = () => {
    let tempOwner = []
    for(var key in selectedCart.items){
      if(!selectedAllCart){
        dispatch(updateCheckedProduct(key,true))
        if(!tempOwner.includes(selectedCart.items[key].ownerId))tempOwner.push(selectedCart.items[key].ownerId)
      }else{
        dispatch(updateCheckedProduct(key,false))
      }
    }
    setSelectedAllCart(!selectedAllCart)
    setOwnerCartSelected(tempOwner)
  }
  const handleCheckout = () =>{
    try {
      setError(null)
      setIsLoading(true)
      let tempProductSelected = []
      let tempSum = 0
      for(var key in selectedCart.items){
        if(selectedCart.items[key].isChecked){
          tempProductSelected.push(selectedCart.items[key])
          tempSum += selectedCart.items[key].sum
        }
      }
      if(tempProductSelected.length > 0) dispatch(addOrder(tempProductSelected,tempSum))
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
    }
    
  }
  useEffect(() => {
    if(error){
      Alert.alert('Error',error)
    }
  },[error])
  return (
    <View style={styles.container}>
      <View style={{height:60}}>
        <View style={{...styles.choice,...styles.shadow}}>
            <CheckBox
              value={selectedAllCart}
              onValueChange={handleCheckedAllProduct}
              style={styles.checkbox}
            />
            <Title>Pilih</Title>
            <Label>Pilih</Label>
        </View>
        <View style={{height:1,backgroundColor:'#e9e8e9'}} ></View>
        <View style={{height:1,backgroundColor:'#e4e2e4'}} ></View>
        <View style={{height:1,backgroundColor:'#efeeef'}} ></View>
        <View style={{height:1,backgroundColor:'#f5f5f5'}} ></View>
        <View style={{height:1,backgroundColor:'#fafafa'}} ></View>
        <View style={{height:1,backgroundColor:'#fdfdfd'}} ></View>
        <View style={{height:1,backgroundColor:'#fefefe'}} ></View>
        <View style={{height:1,backgroundColor:'#fff'}} ></View>
      </View>
      <View style={{flex:1}}>
        <FlatList 
          data={tempOwnerId}
          keyExtractor={(item,idx) => idx }
          renderItem={(itemData,index) => <CartItem data={itemData} ownerData={tempCartOwner} productData={tempCart} handleCheckedProdCart={handleCheckedProdCart} cartOwnerSelected={cartOwnerSelected} handleCheckedOwnerCart={handleCheckedOwnerCart} onViewDetail={() =>{
            props.navigation.navigate('ProductDetailScreen',{
              prodId : itemData.item.id
            })
          }}
          /> 
          }
        />
      </View>
      <View style={{height:120}}>
        <View style={styles.footerContainer}>
        <View style={{height:1,backgroundColor:'#fff'}} ></View>
        <View style={{height:1,backgroundColor:'#fefefe'}} ></View>
        <View style={{height:1,backgroundColor:'#fafafa'}} ></View>
        <View style={{height:1,backgroundColor:'#fdfdfd'}} ></View>
        <View style={{height:1,backgroundColor:'#f5f5f5'}} ></View>
        <View style={{height:1,backgroundColor:'#efeeef'}} ></View>
        <View style={{height:1,backgroundColor:'#e4e2e4'}} ></View>
        <View style={{height:1,backgroundColor:'#e9e8e9'}} ></View>
          <View style={styles.discountContainer}>
            <View style={{...styles.discountSelect,...styles.discountBorder}}>
              <View style={styles.dicountTitle}>
                <Ionicons name="cash-outline" size={30} color={Colors.primary500} />
                <Title styleProps={{paddingTop:4,paddingLeft:10}}>Makin Hemat Pakai Promo</Title>
              </View>
              <Title  styleProps={{paddingTop:4,paddingLeft:10}}>&gt;</Title>
            </View>
          </View>
          <View style={styles.discountSelect}>
            <View><Heading>{Currency(selectedCart.totalAmount,'rp')}</Heading></View>
            <View>
            {
              isLoading ? 
              <ActivityIndicator size='large' color={Colors.primary500} />
              : 
              <ButtonOpacity variant='primary' styleProps={{padding:20}} onPress={() => handleCheckout()}><Title styleProps={{color:Colors.white}}>Checkout ({selectedCart.totalItems})</Title></ButtonOpacity>
            }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkbox: {
    alignSelf: "center",
  },
  choice:{
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:Colors.background,
    height:'94%'
  },
  footerContainer:{
    backgroundColor:Colors.background,
    position:'absolute',
    bottom:0,
    height:120,
    width:'100%',
  },
  discountContainer:{
    paddingVertical:10,
    paddingHorizontal:15
  },
  discountBorder:{
    borderRadius:3,
    borderWidth:1,
    borderColor:Colors.gray,
  },
  discountSelect:{
    flexDirection:'row',
    paddingVertical:7,
    paddingHorizontal:15,
    justifyContent:'space-between'
  },
  dicountTitle:{
    flexDirection:'row',
  },
  shadow:{
  }
});
