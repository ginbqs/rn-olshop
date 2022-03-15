import {useState} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native';
import {useSelector} from 'react-redux'
import CheckBox from "expo-checkbox";
import {Ionicons} from '@expo/vector-icons'
import { Heading, Label,Title } from '../../components/Font';
import Colors from '../../constants/Colors';
import ButtonOpacity from '../../components/ButtonOpacity';
import { Currency } from '../../utils/Number';
import CartItem from '../../components/shop/CartItem';

export default function CartScreen() {
  const [isSelected, setSelection] = useState(false);
  const selectedCart = useSelector(state => state.carts)
  let ownerId = ''
  let tempCart = {}
  let updateCart = []
  let tempCartOwner = []
  for (const key in selectedCart.items) {
    ownerId =  selectedCart.items[key].ownerId
    if(!tempCartOwner.includes(ownerId)) tempCartOwner.push(ownerId)
    
    // updateCart.push({
    //   note: selectedCart.items[key].note,
    //   productId: selectedCart.items[key].prodId,
    //   productPrice: selectedCart.items[key].productPrice,
    //   quantity: selectedCart.items[key].quantity,
    //   sum: selectedCart.items[key].sum,
    //   ownerId: selectedCart.items[key].ownerId,
    // })
    // tempCart = {...tempCart,[ownerId]:updateCart}
    // console.log(selectedCart.items[key])
    // console.log(selectedCart.items[key])
    tempCart[ownerId] =  {...tempCart[ownerId],[key]:selectedCart.items[key]}
    // if()
  }
  console.log('tempCart')
  console.log(tempCartOwner)
  console.log(tempCart)
  return (
    <View style={styles.container}>
      <View style={styles.choice}>
      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Title>Pilih</Title>
        <Label>Pilih</Label>
      </View>
      <View>
        <FlatList 
          data={tempCart}
          keyExtractor={(item,idx) => idx }
          renderItem={(itemData,index) => <CartItem data={itemData} onViewDetail={() =>{
            props.navigation.navigate('ProductDetailScreen',{
              prodId : itemData.item.id
            })
          }}
          onAddToCart={() => {
            dispatch(addToCart(itemData.item))
          }} 
          /> 
          }
        />
        <Text>Open up CartScreen.js to start working on your app!</Text>
      </View>
      <View style={styles.footerContainer}>
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
          <ButtonOpacity variant='primary' styleProps={{padding:20}}><Title styleProps={{color:Colors.white}}>Beli ({Object.keys(selectedCart.items).length})</Title></ButtonOpacity>
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
    backgroundColor:Colors.background
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
  }
});
